import { fixedImageSizes } from './fixed-image-sizes';
import { responsiveImageSizes } from './reponsize-images';
import { IImageSizeArgs, IImageSizes } from '../models/models';

export function calculateImageSizes(args: IImageSizeArgs): IImageSizes {
  const { filename, layout, sourceMetadata: imgDimensions, breakpoints } = args;

  if (layout === `fixed`) {
    return fixedImageSizes(args);
  } else if (layout === `constrained`) {
    return responsiveImageSizes(args);
  } else if (layout === `fullWidth`) {
    return responsiveImageSizes({ breakpoints, ...args });
  } else {
    console.warn(
      `No valid layout was provided for the image at ${filename}. 
      Valid image layouts are fixed, fullWidth, and constrained. Found ${layout}`,
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
