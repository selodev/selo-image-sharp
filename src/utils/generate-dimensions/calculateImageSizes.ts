import { fixedImageSizes } from './fixed-image-sizes';
import { responsiveImageSizes } from './reponsize-images';
import { DEFAULT_BREAKPOINTS } from '../constants';
import { IImageSizeArgs, IImageSizes } from '../models/models';

export function calculateImageSizes(args: IImageSizeArgs): IImageSizes {
  const {
    width,
    height,
    filename,
    layout = `constrained`,
    sourceMetadata: imgDimensions,
    breakpoints = DEFAULT_BREAKPOINTS,
  } = args;

  // check that all dimensions provided are positive
  const userDimensions = { width, height };
  const missingDimensions = Object.entries(userDimensions).filter(([_, size]) => typeof size === `number` && size < 1);
  if (missingDimensions.length) {
    throw new Error(`
        Specified dimensions for images must be positive numbers (> 0). 
        Problem dimensions you have are ${missingDimensions.map(dim => dim.join(`: `)).join(`, `)}
    `);
  }
  if (layout === `fixed`) {
    return fixedImageSizes(args);
  } else if (layout === `constrained`) {
    return responsiveImageSizes(args);
  } else if (layout === `fullWidth`) {
    return responsiveImageSizes({ breakpoints, ...args });
  } else {
    console.warn(
      `No valid layout was provided for the image at ${filename}. Valid image layouts are fixed, fullWidth, and constrained. Found ${layout}`,
    );
    return {
      sizes: [imgDimensions.width],
      presentationWidth: imgDimensions.width,
      presentationHeight: imgDimensions.height,
      aspectRatio: imgDimensions.width / imgDimensions.height,
      unscaledWidth: imgDimensions.width,
    };
  }
}
