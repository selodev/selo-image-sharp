import { DEFAULT_FIXED_WIDTH, DEFAULT_PIXEL_DENSITIES } from '../constants';
import { getDimensionsAndAspectRatio } from '../image-utils/getDimensionsAndAspectRatio';
import { dedupeAndSortDensities } from '../image-utils/utils';
import { IImageSizeArgs } from '../models/models';

export const fixedImageSizes = async ({
  src,
  width,
  height,
  fit = `cover`,
  pixelDensities = DEFAULT_PIXEL_DENSITIES,
  imgDimensions,
}: IImageSizeArgs) => {
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
  width = width ?? height ? Math.round(height * aspectRatio) : DEFAULT_FIXED_WIDTH;
  height = height ?? Math.round(width / aspectRatio);

  const originalWidth = width; // will use this for presentationWidth, don't want to lose it
  const isTopSizeOverriden = imgDimensions.width < width || imgDimensions.height < height;

  // If the image is smaller than requested, warn the user that it's being processed as such
  // print out this message with the necessary information before we overwrite it for sizing
  if (isTopSizeOverriden) {
    const dimensionBy = imgDimensions.width < width ? `width` : `height`;
    console.warn(`
    The requested ${dimensionBy} "${
      dimensionBy === `width` ? width : height
    }px" for the image ${src} was larger than the actual image ${dimensionBy} of ${
      imgDimensions[dimensionBy]
    }px. If possible, replace the current image with a larger one.`);

    if (dimensionBy === `width`) {
      width = imgDimensions.width;
      height = Math.round(width / aspectRatio);
    } else {
      height = imgDimensions.height;
      width = Math.round(height * aspectRatio);
    }
  }
  // Sort, dedupe and ensure there's a 1
  const densities = dedupeAndSortDensities(pixelDensities);
  const sizes = densities
    .filter(desity => desity >= 1) // remove smaller densities because fixed images don't need them
    .map(density => Math.round(density * (width as number)))
    .filter(size => size <= imgDimensions.width);

  return {
    sizes,
    aspectRatio,
    presentationWidth: originalWidth,
    presentationHeight: Math.round(originalWidth / aspectRatio),
    unscaledWidth: width,
  };
};
