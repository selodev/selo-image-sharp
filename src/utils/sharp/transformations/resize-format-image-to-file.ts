import { Sharp } from 'sharp';
import { ImageOptions } from '../models';
import { getCreateSourceDestinationPaths } from './get-source-destination-paths';

export const resizeFormatImageToFile = async ({
  sourceOptions,
  destinationOptions,
  resizeOptions,
  jpgOptions,
  pngOptions,
  webpOptions,
  avifOptions,
}: ImageOptions) => {
  try {
    const { absoluteImageSrc, absoluteImageDest } = await getCreateSourceDestinationPaths(
      {
        sourceOptions,
        destinationOptions,
        resizeOptions,
      },
    );
    const { default: sharp } = await import('sharp');
    const pipeline: Sharp = sharp(absoluteImageSrc);

    let { width, height, fit, format } = resizeOptions;

    if (width || height) {
      pipeline.resize(width, height, { fit });
    }

    if (format == 'jpg') {
      pipeline.jpeg({ ...jpgOptions });
    } else if (format == 'png') {
      pipeline.png({ ...pngOptions });
    } else if (format == 'avif') {
      pipeline.avif({ ...avifOptions });
    } else if (format == 'webp') {
      pipeline.webp({ ...webpOptions });
    } else {
      throw 'Image format is not supported.';
    }

    return await pipeline.toFile(absoluteImageDest);
  } catch (error) {
    console.error(error);
  }
};
