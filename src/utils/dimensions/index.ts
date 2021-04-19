import { ImageOptions } from '..';
import { getCalculatedDimensions } from './get-calculated-dimensions';
import { checkSetGetDimensions } from './check-set-get-dimensions';

export default async (options: ImageOptions) => {
  const {
    resizeOptions,
    resizeOptions: { width, height },
    inputOptions,
  } = options;
  //const widthsByDensitiesOrBreakpoints = getWidthsByDensitisOrBreakpoints({ ...inputOptions });

  const { sourceMetadata } = await checkSetGetDimensions({ width, height, inputOptions });
  return getCalculatedDimensions(sourceMetadata, resizeOptions);
};
