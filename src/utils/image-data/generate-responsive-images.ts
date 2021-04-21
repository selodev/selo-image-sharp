import { ImageOptions } from '..';
import { CalculatedDimension } from '../models';
import { formatGetFileName } from './format-get-filename';

export const getImageProps = (options: ImageOptions, sizes: CalculatedDimension[]) => {
  const {
    inputOptions: { srcFileName },
    outputOptions: { destPath, digestDirPrefix, destFileName },
    resizeOptions: { formats, layout },
  } = options;

  const imageSizes = {};

  Array.from(formats).map(format => {
    const transformationsToImageProps = sizes.map(({ width, height }) => {
      const formattedDestFileName = formatGetFileName({
        src: destFileName || srcFileName,
        width,
        height,
        format,
      }).formattedFileName;

      return {
        src: `${destPath}/${digestDirPrefix}/${format}/${formattedDestFileName}`,
        width,
        type: `image/${format}`,
        layout,
      };
    });

    imageSizes[format] = transformationsToImageProps;
  });
  return imageSizes;
};
