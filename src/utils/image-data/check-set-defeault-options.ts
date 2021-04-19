import { imageOptions, ImageOptions } from '..';
import { SUPPORTED_FORMATS } from '../constants';

export const checkSetTransformOptions = (options: ImageOptions = imageOptions) => {
  const { resizeOptions } = options;
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
  return { imageFormats };
};

/* export const checkSharpTransformOptions = (sharpTransformOptions, file) => {
  const {
    fit = `cover`,
    cropFocus: "sharp.strategy.intention1,
    duotone: { heighlight, shadow },
  } = sharpTransformOptions;

  heighlight ??
    shadow ??
    console.warn(
      `Invalid duotone option specified for ${file.absolutePath}, 
          ignoring. Please pass an object to duotone with the keys 
          "highlight" and "shadow" set to the corresponding hex values you want to use.`,
    );
  return fit;
};
 */
