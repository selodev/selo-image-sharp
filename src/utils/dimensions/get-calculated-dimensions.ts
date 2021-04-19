import { calculateWithHieghtRatio } from './get-calculated-with-hight-ratio';
import { CalculatedDimension, ResizingOptions, sourceMetadata } from '../models';
import { getWidthsByDensitisOrBreakpoints } from './get-Witdths-by-densities-breakpoints';

export const getCalculatedDimensions = async (
  sourceMetadata: sourceMetadata,
  resizeOptions: ResizingOptions,
) => {
  const {
    width,
    height,
    fit,
    aspectRatio,
    layout,
    pixelDensities,
    breakpoints,
  } = resizeOptions;

  const dimensionBy = (width || height) && width ? 'width' : 'height' || 'width';

  let sourceDimensions: CalculatedDimension = calculateWithHieghtRatio({
    sourceMetadata,
    [dimensionBy]: sourceMetadata[dimensionBy],
    aspectRatio,
    fit,
    layout,
  });

  const requestedDimensions: CalculatedDimension = calculateWithHieghtRatio({
    sourceMetadata,
    ...resizeOptions,
  });

  let widths: any = getWidthsByDensitisOrBreakpoints({
    breakpoints,
    width,
    layout,
    pixelDensities,
    sourceMetadata,
  });

  const layoutDimensions: Array<CalculatedDimension> = [...widths].map(sortedWidth =>
    calculateWithHieghtRatio({
      sourceMetadata,
      width: sortedWidth,
      aspectRatio,
      fit,
      layout,
    }),
  );
  console.log('calculatedDimensions', layoutDimensions);

  return { sourceDimensions, requestedDimensions, layoutDimensions };
};
