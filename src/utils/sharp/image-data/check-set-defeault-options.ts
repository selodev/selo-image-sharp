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
  let { sourceMetadata } = sourceOptions;
  let {
    formats,
    layout,
    fit,
    breakpoints,
    pixelDensities,
    primaryFormat,
    position,
    width,
  } = resizeOptions;

  formats = formats ? new Set(formats) : SUPPORTED_FORMATS;

  if (!formats.size) throw new Error("Formats can't be empty!");
  if (!primaryFormat || !SUPPORTED_FORMATS.has(primaryFormat)) {
    throw new Error(`${primaryFormat} format is not included in resizing options`);
  }
  if (layout == 'fixed' && !width) {
    throw new Error(
      'When specifying layout as fixed, width must be provided in options.',
    );
  }

  if (
    (fit != 'cover' && position == 'entropy') ||
    (fit == 'cover' && position == 'attention')
  ) {
    throw new Error(`The fit strategy, COVER only will work when postion is
    set to ENTROPY or ATTENTION.`);
  }

  if (formats.has(`jpg`) && formats.has(`png`)) {
    throw new Error(`Specifying both "jpg" and "png" formats is not
    supported, Setting primaryFormat option is required.`);
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

  pixelDensities ??= DEFAULT_PIXEL_DENSITIES;
  breakpoints ??= DEFAULT_BREAKPOINTS;
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
