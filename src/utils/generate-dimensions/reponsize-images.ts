import { DEFAULT_FLUID_WIDTH, DEFAULT_PIXEL_DENSITIES } from '../constants';
import { getDimensionsAndAspectRatio } from '../image-utils/getDimensionsAndAspectRatio';
import { IImageSizeArgs, IImageSizes } from '../models/models';
import { dedupeAndSortDensities, sortNumeric } from '../image-utils/utils';

export const responsiveImageSizes = ({
  sourceMetadata: imgDimensions,
  width,
  height,
  fit = `cover`,
  pixelDensities = DEFAULT_PIXEL_DENSITIES,
  breakpoints,
  layout,
}: IImageSizeArgs): IImageSizes => {
  let aspectRatio = imgDimensions.width / imgDimensions.height;

  // If both are provided then we need to check the fit
  if (width && height) {
    const calculated = getDimensionsAndAspectRatio(
      imgDimensions,
      {
        width,
        height,
      },
      fit,
    );
    width = calculated.width;
    height = calculated.height;
    aspectRatio = calculated.aspectRatio;
  }
  // Neither width or height were passed in, use default size
  width = width ?? height ? Math.round(height * aspectRatio) : DEFAULT_FLUID_WIDTH;
  height = height ?? Math.round(width / aspectRatio);

  // width and height were passed in, make sure it isn't larger than the actual image
  width = Math.round(Math.min(width, imgDimensions.width));
  height = Math.round(Math.min(height, imgDimensions.height));

  const originalWidth = width;
  const isTopSizeOverriden = imgDimensions.width < width || imgDimensions.height < height;
  if (isTopSizeOverriden) {
    width = imgDimensions.width;
    height = imgDimensions.height;
  }
  let sizes;
  // Sort, dedupe and ensure there's a 1
  const densities = dedupeAndSortDensities(pixelDensities);

  if (breakpoints?.length > 0) {
    sizes = breakpoints.filter(breakpoint => breakpoint <= imgDimensions.width);

    // If a larger breakpoint has been filtered-out, add the actual image width instead
    if (sizes.length < breakpoints.length && !sizes.includes(imgDimensions.width)) {
      sizes.push(imgDimensions.width);
    }
  } else {
    sizes = densities.map(density => Math.round(density * width));
    sizes = sizes.filter(size => size <= imgDimensions.width);
  }

  // ensure that the size passed in is included in the final output
  if (layout === `constrained` && !sizes.includes(width)) {
    sizes.push(width);
  }
  sizes = sizes.sort(sortNumeric);
  return {
    sizes,
    aspectRatio,
    presentationWidth: originalWidth,
    presentationHeight: Math.round(originalWidth / aspectRatio),
    unscaledWidth: width,
  };
};
