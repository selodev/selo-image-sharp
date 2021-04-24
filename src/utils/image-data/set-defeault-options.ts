import { ImageOptions } from '..';
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_PIXEL_DENSITIES,
  SUPPORTED_FORMATS,
  SUPPORTED_LAYOUTS,
} from '../constants';
import { getWriteMetadataToFile } from '../meta-data/get-write-metadata-to-file';

export const checkSetDefaultOptions = async (options: ImageOptions) => {
  const { resizeOptions, sourceOptions } = options;

  // Output Options
  let { srcFileName, sourceMetadata } = sourceOptions;
  let { formats, layout, fit, breakpoints, pixelDensities } = resizeOptions;

  formats = formats ? new Set(formats) : SUPPORTED_FORMATS;
  if (!formats.size) throw new Error("Formats can't be empty!");
  if (formats.has(`jpg`) && formats.has(`png`)) {
    const fileFormat = srcFileName.includes('png') ? 'png' : 'jpg';
    fileFormat == 'png' ? formats.delete('jpg') : formats.delete('png');
    console.warn(`Specifying both "jpg" and "png" formats is not
    supported, Only ${fileFormat} is used instead.`);
  }
  for (let format of formats) {
    if (!SUPPORTED_FORMATS.has(format)) {
      throw new Error(
        `${format} format is not supported. 
        Allowed formats are ${SUPPORTED_FORMATS}`,
      );
    }
  }
  if (!SUPPORTED_LAYOUTS.has(layout)) {
    throw new Error(
      `Invalid value ${layout}" provided for prop "layout". Defaulting to "constrained". 
      Valid values are "fixed", "fullWidth" or "constrained".`,
    );
  }

  sourceMetadata ??= await getWriteMetadataToFile(options);
  console.log('sourceMetadata in potion', sourceMetadata);

  pixelDensities ??= DEFAULT_PIXEL_DENSITIES;
  breakpoints ?? DEFAULT_BREAKPOINTS;
  layout ??= 'constrained';
  fit ??= 'cover';

  return {
    ...options,
    sourceOptions: { ...sourceOptions, sourceMetadata },
    resizeOptions: {
      ...resizeOptions,
      formats,
      layout,
      fit,
      pixelDensities,
      breakpoints,
    },
  };
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
