import { ImageOptions } from '..';
import { prepareImageInformation } from '../image-data/prepare-image-metadata';

export const generateGetTransformations = (options: ImageOptions, imageFormats, sizes) => {
  const { inputOptions, outputOptions, resizeOptions } = options;
  // Output Options

  const transformations: ImageOptions[] = Array.from(imageFormats)
    .map(format =>
      sizes.map(({ width, height }) => ({
        inputOptions,
        outputOptions: {
          ...outputOptions,
          destFileName: prepareImageInformation({
            src: inputOptions.srcFileName,
            width,
            height,
            format,
          }).formattedFileName,
        },
        resizeOptions: { ...resizeOptions, width, height, format },
        [format + 'Options']: options[format + 'Options'],
      })),
    )
    .reduce((previosValue, currentValue) => previosValue.concat(currentValue), []);

  return { transformations };
};
