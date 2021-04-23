import { Build } from '@stencil/core';
import { ImageOptions } from '..';
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_PIXEL_DENSITIES,
  SUPPORTED_FORMATS,
  SUPPORTED_LAYOUTS,
} from '../constants';
import { getMetadataStats } from './get-metadata-stats';

export const checkSetDefaultOptions = async (options: ImageOptions) => {
  checkGetDimensions(options);
  const { resizeOptions, sourceOptions } = options;
  const { srcPath, srcPathPrefix, srcFileName } = sourceOptions;

  // Output Options
  let { formats, pixelDensities, breakpoints, layout, fit } = resizeOptions;
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

  let { sourceMetadata } = sourceOptions;
  if(!Build.isBrowser){
  sourceMetadata ??= await getMetadataStats({
    srcPathPrefix,
    srcPath,
    srcFileName,
  })}

  pixelDensities ??= DEFAULT_PIXEL_DENSITIES;
  breakpoints ?? DEFAULT_BREAKPOINTS;
  layout ??= 'constrained';
  fit ??= 'cover';
  return {
    ...options,
    resizeOptions: {
      ...resizeOptions,
      formats,
      pixelDensities,
      breakpoints,
      layout,
      fit,
    },
    sourceOptions: { ...sourceOptions, sourceMetadata },
  };
};

export const checkGetDimensions = async (options: ImageOptions) => {
  const {
    resizeOptions: { width, height },
  } = options;
  // check that all dimensions provided are positive
  const userDimensions = { width, height };
  const negativeDimensions = Object.entries(userDimensions).filter(
    ([_, size]) => typeof size === `number` && size < 1,
  );
  if (negativeDimensions.length) {
    throw new Error(
      `Specified dimensions for images must be positive numbers (> 0). 
          Problem dimensions you have are ${negativeDimensions
            .map(dimension => dimension.join(`: `))
            .join(`, `)}`,
    );
  }
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
