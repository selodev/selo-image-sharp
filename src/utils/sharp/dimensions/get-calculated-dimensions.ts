import { getCalculateWithHieghtRatio } from './get-calculated-with-hight-ratio';
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

  let sourceDimensions: CalculatedDimension = getCalculateWithHieghtRatio({
    sourceMetadata,
    [dimensionBy]: sourceMetadata[dimensionBy],
    aspectRatio,
    fit,
    layout,
  });

  const requestedDimensions: CalculatedDimension = getCalculateWithHieghtRatio({
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
    getCalculateWithHieghtRatio({
      sourceMetadata,
      width: sortedWidth,
      height,
      aspectRatio,
      fit,
      layout,
    }),
  );
  return { sourceDimensions, requestedDimensions, layoutDimensions };
};
