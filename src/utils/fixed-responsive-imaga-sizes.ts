import { DEFAULT_PIXEL_DENSITIES } from './constants';
import { getDimensionsAndAspectRatio } from './getDimensionsAndAspectRatio';
import { IImageSizeArgs, IImageSizes } from './models';
import { getSizesByBreakpoints } from './get-sizes-by-breakpoints';

export const fixedResponsiveImageSizes = ({
  sourceMetadata,
  width,
  height,
  fit = `cover`,
  pixelDensities = DEFAULT_PIXEL_DENSITIES,
  breakpoints,
  layout,
  aspectRatio,
}: IImageSizeArgs): IImageSizes => {
  // Calculate the eventual width/height of the image.
  aspectRatio = sourceMetadata.width / sourceMetadata.height;
  if (aspectRatio) {
    if (width && height) {
      console.warn(
        `Specifying aspectRatio along with both width and height will cause 
            aspectRatio to be ignored.`,
      );
    } else {
      aspectRatio = aspectRatio;
    }
  }

  // If both are provided then we need to check the fit
  if (width && height) {
    ({ width, height, aspectRatio } = getDimensionsAndAspectRatio({
      sourceMetadata,
      width,
      height,
      fit,
    }));
  }
  // Neither width or height were passed in, use default size
  width =
    width ?? height ? Math.round(height * aspectRatio) : sourceMetadata.width;
  height = height ?? Math.round(width / aspectRatio);

  const requestedWidth = width;
  const isTopSizeOverriden =
    sourceMetadata.width < width || sourceMetadata.height < height;
  // If the image is smaller than requested, warn the user that it's being processed as such
  // print out this message with the necessary information before we overwrite it for sizing
  if (isTopSizeOverriden) {
    const dimensionBy = sourceMetadata.width < width ? `width` : `height`;
    console.warn(`
    The requested ${dimensionBy} "${
      dimensionBy === `width` ? width : height
    }px" for the image ${'src'} was larger than the actual image ${dimensionBy} of ${
      sourceMetadata[dimensionBy]
    }px. If possible, replace the current image with a larger one.`);
    // width and height were passed in, make sure it isn't larger than the actual image
    width = Math.round(Math.min(width, sourceMetadata.width));
    height = Math.round(Math.min(height, sourceMetadata.height));
  }
  let sizes = getSizesByBreakpoints({
    breakpoints,
    width,
    layout,
    pixelDensities,
    sourceMetadata,
  });

  return {
    sizes,
    aspectRatio,
    presentationWidth: requestedWidth,
    presentationHeight: Math.round(requestedWidth / aspectRatio),
    unscaledWidth: width,
  };
};
