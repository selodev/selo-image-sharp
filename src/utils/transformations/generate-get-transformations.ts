import { ImageOptions } from '..';
import { prepareImageInformation } from '../image-data/prepare-image-metadata';
import { CalculatedDimension } from '../models';

export const generateGetTransformations = (
  options: ImageOptions,
  sizes: CalculatedDimension[],
) => {
  const {
    inputOptions,
    outputOptions,
    resizeOptions: { formats, layout },
  } = options;
  // Output Options

  const transformations: any[] = Array.from(formats).map(format =>
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
      resizeOptions: { width, height, format, layout },
      [format + 'Options']: options[format + 'Options'],
    })),
  );
  // .reduce((previosValue, currentValue) => previosValue.concat(currentValue), []);

  return { transformations };
};
