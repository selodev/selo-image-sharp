import { Build } from '@stencil/core';
import { ImageOptions, joinPaths } from '..';
import { CalculatedDimension, ImageSource, ImageSources } from '../models';
import { createHashFromFile } from './create-hash-from-file';
import { formatGetFileName } from './format-get-filename';

export const generateImageSources = (
  options: ImageOptions,
  layoutDimensions: CalculatedDimension[],
) => {
  const {
    sourceOptions: { srcFileName },
    destinationOptions: { destPath, destPathPrefix, digestDirPrefix, destFileName },
    resizeOptions: { formats },
  } = options;

  const imageSources: ImageSources = {};
  Array.from(formats).forEach(format => {
    const transformationsToImageProps: Promise<ImageSource>[] = layoutDimensions.map(
      async ({ width, height }) => {
        const formattedDestFileName = formatGetFileName({
          src: destFileName || srcFileName,
          width,
          height,
          format,
        }).formattedFileName;
        const src = joinPaths([destPath, digestDirPrefix, format, formattedDestFileName]);
        const hash = !Build.isBrowser
          ? await createHashFromFile(joinPaths([destPathPrefix, src], '/'), 10)
          : '';
        return {
          src: `${src}?v=${hash}`,
          width,
          type: `image/${format}`,
        };
      },
    );

    imageSources[format] = transformationsToImageProps;
  });
  return imageSources;
};
