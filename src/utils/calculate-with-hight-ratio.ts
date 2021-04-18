import { DEFAULT_FIXED_WIDTH, DEFAULT_FLUID_WIDTH } from './constants';
import { getDimensionsAndAspectRatio } from './getDimensionsAndAspectRatio';
import { CalculatedDimensions, CalculateWithHeightRatio } from './models';

export const calculateWithHieghtRatio = ({
  sourceMetadata,
  width,
  height,
  aspectRatio,
  fit,
  layout,
  allowOversizedDimensions,
}: CalculateWithHeightRatio): CalculatedDimensions => {
  console.log('wid', width, height, sourceMetadata.width);
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
  // If Neither width or height were passed in, use default size
  let defaultWith;
  if (layout) {
    defaultWith =
      layout == 'fullWidth' || 'constrain'
        ? DEFAULT_FLUID_WIDTH
        : layout == 'fixed'
        ? DEFAULT_FIXED_WIDTH
        : sourceMetadata.width;
  } else {
    defaultWith = sourceMetadata.width;
  }
  width = width ?? (height ? Math.round(height * aspectRatio) : defaultWith);
  height = height ?? Math.round(width / aspectRatio);

  const isActualImageSmallerThanRequested =
    sourceMetadata.width < width || sourceMetadata.height < height;
  // If the image is smaller than requested, warn the user that it's being processed as such
  // print out this message with the necessary information before we overwrite it for sizing
  if (isActualImageSmallerThanRequested && !allowOversizedDimensions) {
    const dimensionBy = sourceMetadata.width < width ? `width` : `height`;
    console.warn(`
    The requested ${dimensionBy} "${
      dimensionBy === `width` ? width : height
    }px" for the image ${'src'} was larger than the actual image ${dimensionBy} of ${
      sourceMetadata[dimensionBy]
    }px. If possible, replace the current image with a larger one.`);
    // width and height were passed in, make sure it isn't larger than the actual image
    width = Math.round(Math.min(width, sourceMetadata.width));
    height = Math.round(width / aspectRatio);
  }

  return {
    width,
    height,
    aspectRatio,
  };
};
