import { calculateWithHieghtRatio } from './calculate-with-hight-ratio';
import { CalculatedDimension, ResizingOptions, srcMetadata } from '../models';
import { getWidthsByDensitisOrBreakpoints } from './getWitdths-by-densities-breakpoints';

export const getCalculatedDimensions = async (
  srcMetadata: srcMetadata,
  resizeOptions: ResizingOptions,
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

  const dimensionBy = (width || height) && width ? 'width' : 'height' || 'width';

  let sourceDimensions = calculateWithHieghtRatio({
    srcMetadata,
    [dimensionBy]: srcMetadata[dimensionBy],
    aspectRatio,
    fit,
    layout,
    allowOversizedDimensions,
  });

  const requestedDimensions = calculateWithHieghtRatio({
    srcMetadata,
    ...resizeOptions,
  });

  let widths: any = getWidthsByDensitisOrBreakpoints({
    breakpoints,
    width,
    layout,
    pixelDensities,
    srcMetadata,
    allowOversizedDimensions,
  });
  const resizeDimensions: Array<CalculatedDimension> = [...widths].map(sortedWidth =>
    calculateWithHieghtRatio({
      srcMetadata,
      width: sortedWidth,
      aspectRatio,
      fit,
      layout,
      allowOversizedDimensions,
    }),
  );
  console.log('calculatedDimensions', resizeDimensions);

  return { sourceDimensions, requestedDimensions, resizeDimensions };
};
