import { ImageOptions } from '..';
import { formatGetFileName } from '../image-data/format-get-filename';
import { CalculatedDimension } from '../models';

export const generateGetTransformations = (
  options: ImageOptions,
  sizes: CalculatedDimension[],
) => {
  const {
    sourceOptions,
    sourceOptions: { srcFileName },
    destinationOptions,
    destinationOptions: { destFileName },
    resizeOptions: { formats, layout },
  } = options;
  // Output Options

  const imagesForProccessing: any[] = Array.from(formats)
    .map(format =>
      sizes.map(({ width, height }) => ({
        sourceOptions,
        destinationOptions: {
          ...destinationOptions,
          destFileName: formatGetFileName({
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
