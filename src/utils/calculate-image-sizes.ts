import { dedupeAndSortDensities, sortNumeric } from './utils';
import { calculateWithHieghtRatio } from './calculate-with-hight-ratio';
import { CalculatedDimensions, inputOptions, ResizingOptions } from './models';
import { getMetadataStats } from './get-metadata';

export const calculateImageSizes = async (
  resizeOptions: ResizingOptions,
  inputOptions: inputOptions,
) => {
  const {
    width,
    height,
    fit,
    aspectRatio,
    layout,
    allowOversizedDimensions,
    pixelDensities,
    breakpoints,
  } = resizeOptions;
  checkNegativeDimensions({ width, height });

  const { srcPath, srcPathPrefix, srcFileName } = inputOptions;
  const sourceMetadata = await getMetadataStats({
    srcPathPrefix,
    srcPath,
    srcFileName,
  });

  const { width: calculatedWith } = calculateWithHieghtRatio({
    sourceMetadata,
    ...resizeOptions,
  });

  let sizes: any = [];

  const dimensionBy = (width || height) && width ? 'width' : 'height' || 'width';

  let sourceImageDimensions = calculateWithHieghtRatio({
    sourceMetadata,
    [dimensionBy]: sourceMetadata[dimensionBy],
    aspectRatio,
    fit,
    layout,
    allowOversizedDimensions,
  });

  const requestedDimensions = calculateWithHieghtRatio({
    sourceMetadata,
    ...resizeOptions,
  });

  if (breakpoints.length > 0 && layout == 'fullWidth') {
    if (!allowOversizedDimensions) {
      sizes = breakpoints.filter(breakpoint => breakpoint <= sourceMetadata.width);
    } else {
      sizes = [...breakpoints];
    }
    // If a larger breakpoint has been filtered-out, add the actual image width instead
    if (sizes.length < breakpoints.length && !sizes.includes(sourceMetadata.width)) {
      sizes.push(sourceMetadata.width);
    }
  } else if (pixelDensities && layout == 'fixed') {
    // Sort, dedupe and ensure there's a 1
    const densities = dedupeAndSortDensities(pixelDensities);
    // remove smaller densities because fixed images don't need them
    sizes = densities
      .map(density => Math.round(density * (calculatedWith as number)))
      .filter(size => allowOversizedDimensions || size <= sourceMetadata.width);
  }
  // ensure that the size passed in is included in the final output
  if (layout === `constrained` && !sizes.includes(width)) {
    sizes.push(width);
  }

  const calculatedDimensions: Array<CalculatedDimensions> = [...sizes]
    .sort(sortNumeric)
    .map(sortedWidth =>
      calculateWithHieghtRatio({
        sourceMetadata,
        width: sortedWidth,
        aspectRatio,
        fit,
        layout,
        allowOversizedDimensions,
      }),
    );
  console.log('calculatedDimensions', calculatedDimensions);

  return { sourceImageDimensions, requestedDimensions, calculatedDimensions };
};

const checkNegativeDimensions = ({ width, height }) => {
  // check that all dimensions provided are positive
  const userDimensions = { width, height };
  const negativeDimensions = Object.entries(userDimensions).filter(
    ([_, size]) => typeof size === `number` && size < 1,
  );
  if (negativeDimensions.length) {
    throw new Error(
      `Specified dimensions for images must be positive numbers (> 0). 
        Problem dimensions you have are ${negativeDimensions
          .map(dimension => dimension.join(`: `))
          .join(`, `)}`,
    );
  }
};
