import { fixedImageSizes } from './fixed-image-sizes';
import { responsiveImageSizes } from './reponsize-images';
import { ISharpImageArgs } from './models';
import { DEFAULT_BREAKPOINTS } from './constants';

export function calculateImageSizes(args: ISharpImageArgs) {
  const { layout, sourceMetadata,inputFile } = args;
  let { breakpoints, width, height } = args;

  checkNegativeDimensions({ width, height });
  if (layout === `fixed`) {
    return fixedImageSizes(args);
  } else if (layout === `constrained`) {
    return responsiveImageSizes(args);
  } else if (layout === `fullWidth`) {
    if (layout === `fullWidth`)
      breakpoints = breakpoints ?? DEFAULT_BREAKPOINTS;
    if ((width || height) && layout === `fullWidth`) {
      console.warn(
        `Specifying fullWidth images will ignore the width and height arguments,
             you may want a constrained image instead. Otherwise,
              use the breakpoints argument.`,
      );
      width = sourceMetadata?.width;
      height = undefined;
    }
    return responsiveImageSizes({ breakpoints, ...args });
  } else {
    console.warn(
      `No valid layout was provided for the image at ${inputFile}. 
      Valid image layouts are fixed, fullWidth, and constrained. Found ${layout}`,
    );
    return {
      sizes: [sourceMetadata.width],
      presentationWidth: sourceMetadata.width,
      presentationHeight: sourceMetadata.height,
      aspectRatio: sourceMetadata.width / sourceMetadata.height,
      unscaledWidth: sourceMetadata.width,
    };
  }
  //return { ...args, width, height, aspectRatio, layout, formats };
}

const checkNegativeDimensions = ({ width, height }) => {
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
