import { ImageOptions, joinPaths } from '..';
import { CalculatedDimension, ImageSource, ImageSources } from '../models';
import { createHashFromFile } from './create-hash-from-file';
import { formatGetFileName } from './format-get-filename';

export const generateImageSources = (
  options: ImageOptions,
  sizes: CalculatedDimension[],
) => {
  const {
    sourceOptions: { srcFileName },
    destinationOptions: { destPath, destPathPrefix, digestDirPrefix, destFileName },
    resizeOptions: { formats },
  } = options;

  const imageSources: ImageSources = {};
  Array.from(formats).forEach(format => {
    const transformationsToImageProps: Promise<ImageSource>[] = sizes.map(
      async ({ width, height }) => {
        const formattedDestFileName = formatGetFileName({
          src: destFileName || srcFileName,
          width,
          height,
          format,
        }).formattedFileName;
        const src = joinPaths([destPath, digestDirPrefix, format, formattedDestFileName]);
        const hash = await createHashFromFile(joinPaths([destPathPrefix, src], '/'), 10);
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
