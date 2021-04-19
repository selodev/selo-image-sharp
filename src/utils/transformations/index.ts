import { ImageOptions } from '..';
import { checkSetTransformOptions } from '../image-data/check-set-defeault-options';
import { generateGetTransformations } from './generate-get-transformations';
import { processTransformations } from './process-tranformations';

export default (options: ImageOptions, sizes) => {
  const { imageFormats } = checkSetTransformOptions(options);
  const { transformations } = generateGetTransformations(options, imageFormats, sizes);
  processTransformations(transformations);
};
