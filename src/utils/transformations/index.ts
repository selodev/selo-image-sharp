import { ImageOptions } from '..';
import { checkSetTransformOptions } from './check-set-transform-options';
import { generateTransformations } from './generate-transformations';
import { processTransformations } from './process-tranformations';

export default (options: ImageOptions, sizes) => {
  const { imageFormats } = checkSetTransformOptions(options);
  const { transformations } = generateTransformations(options, imageFormats, sizes);
  processTransformations(transformations);
};
