import { ImageOptions } from '..';
import { formatGetFileName } from '../image-data/format-get-filename';
import { CalculatedDimension } from '../models';

export const generateGetTransformations = (
  options: ImageOptions,
  dimensions: CalculatedDimension[],
) => {
  const {
    sourceOptions,
    sourceOptions: { srcFileName },
    destinationOptions,
    destinationOptions: { destFileName },
    resizeOptions,
    resizeOptions: { formats },
  } = options;

  const imagesForProccessing: any[] = Array.from(formats)
    .map(format =>
      dimensions.map(({ width, height }) => ({
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
        resizeOptions: { ...resizeOptions, width, height, format },
        [format + 'Options']: options[format + 'Options'],
      })),
    )
    .reduce((previosValue, currentValue) => previosValue.concat(currentValue), []);

  return { imagesForProccessing };
};
