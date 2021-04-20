import { ImageOptions } from '..';
import { prepareImageInformation } from '../image-data/prepare-image-metadata';
import { CalculatedDimension } from '../models';

export const generateGetTransformations = (
  options: ImageOptions,
  sizes: CalculatedDimension[],
) => {
  const {
    inputOptions,
    inputOptions: { srcFileName },
    outputOptions,
    outputOptions: { destFileName },
    resizeOptions: { formats, layout },
  } = options;
  // Output Options

  const imagesForProccessing: any[] = Array.from(formats)
    .map(format =>
      sizes.map(({ width, height }) => ({
        inputOptions,
        outputOptions: {
          ...outputOptions,
          destFileName: prepareImageInformation({
            src: destFileName || srcFileName,
            width,
            height,
            format,
          }).formattedFileName,
        },
        resizeOptions: { width, height, format, layout },
        [format + 'Options']: options[format + 'Options'],
      })),
    )
    .reduce((previosValue, currentValue) => previosValue.concat(currentValue), []);

  return { imagesForProccessing };
};
