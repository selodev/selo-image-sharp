import { ImageOptions } from '..';
import { getCalculatedDimensions } from './get-calculated-dimensions';
import { checkSetDimensions } from './check-set-dimensions';

export default (options: ImageOptions) => {
  const {
    resizeOptions: { width, height },
    inputOptions,
  } = options;
  const { srcMetadata } = checkSetDimensions({ width, height, inputOptions })
  return getCalculatedDimensions({})
};
