import { ImageOptions } from '..';
import { resizeFormatImageToFile } from './resize-format-image-to-file';

export const processTransformations = async tranformations => {
  const prorcessTransforms = tranformations.map((transform: ImageOptions) =>
    resizeFormatImageToFile(transform),
  );
  await Promise.all(prorcessTransforms);
};
