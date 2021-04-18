import { SUPPORTED_FORMATS } from './constants';
import { resizeFormatImageToFile } from './resize-format-image-to-file';
import { ImageOptions } from '.';
import { prepareImageInformation } from './prepare-image-metadata';

export const transformImage = async (options: ImageOptions, sizes) => {
  const { inputOptions, outputOptions, resizeOptions } = options;
  // Output Options
  const { formats } = resizeOptions;
  const imageFormats = formats ? new Set(formats) : SUPPORTED_FORMATS;

  if (!imageFormats.size) throw new Error("Formats can't be empty!");
  if (imageFormats.has(`jpg`) && imageFormats.has(`png`)) {
    throw new Error(`Specifying both "jpg" and "png" formats is not
    supported, PLease remove either one!`);
  }
  for (let format of imageFormats) {
    if (!SUPPORTED_FORMATS.has(format)) {
      throw new Error(
        `${format} format is not supported. 
        Allowed formats are ${SUPPORTED_FORMATS}`,
      );
    }
  }

  const transforms: ImageOptions[] = Array.from(imageFormats)
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
    .reduce(
      (previosValue, currentValue) => previosValue.concat(currentValue),
      [],
    );

  const prorcessTransforms = transforms.map((transform: ImageOptions) =>
    resizeFormatImageToFile(transform),
  );
  await Promise.all(prorcessTransforms);

  return { transforms };
};
