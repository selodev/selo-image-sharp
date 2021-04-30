import { calculateWithHieghtRatio } from './get-calculated-with-hight-ratio';
import { CalculatedDimension, ResizingOptions, SourceOptions } from '../models';
import { getWidthsByDensitisOrBreakpoints } from './get-witdths-by-densities-breakpoints';
import { checkDefaultOptions } from './check-default-options';

export const getCalculatedDimensions = async (options: {
  sourceOptions: SourceOptions;
  resizeOptions: ResizingOptions;
}) => {
  checkDefaultOptions(options);

  let {
    sourceOptions: { sourceMetadata },
    resizeOptions,
  } = options;

  let {
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

  let widths: number[] = getWidthsByDensitisOrBreakpoints({
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

  return { sourceDimensions, requestedDimensions, layoutDimensions };
};
