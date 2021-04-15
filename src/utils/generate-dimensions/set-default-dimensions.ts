import { DEFAULT_BREAKPOINTS, SUPPORTED_FORMATS } from '../constants';
import { getMetadata } from '../ex/get-metadata';
import { checkSharpTransformOptions } from '../generate-metadata/check-sharp-transform-options';
import { ISharpImageArgs } from '../models/models';

export const setDefaultDimentions = async (args): Promise<ISharpImageArgs> => {
  const {
    file,
    layout = 'constrained',
    placeholder = `dominantColor`,
    quality,
    aspectRatio,
    sharpTransformOptions,
    sourceMetadata,
  } = args;
  
  let { formats = ['auto', 'webp'], breakpoints, width, height } = args;
  if (layout === `fullWidth`) breakpoints = breakpoints ?? DEFAULT_BREAKPOINTS;
  
  const fit = checkSharpTransformOptions(sharpTransformOptions, file);
  const metadata = await getMetadata(file);
  if ((width || height) && layout === `fullWidth`) {
    console.warn(
      `Specifying fullWidth images will ignore the width and height arguments,
           you may want a constrained image instead. Otherwise,
            use the breakpoints argument.`,
    );
    width = metadata?.width;
    height = undefined;
  }
  if (!width && !height && metadata.width) {
    width = metadata.width;
  }
  if (aspectRatio) {
    if (width && height) {
      console.warn(
        `Specifying aspectRatio along with both width and height will cause 
            aspectRatio to be ignored.`,
      );
    } else if (width) {
      height = width / aspectRatio;
    } else if (height) {
      width = height * aspectRatio;
    }
  }
  // check that all dimensions provided are positive
  const userDimensions = { width, height };
  const missingDimensions = Object.entries(userDimensions).filter(([_, size]) => typeof size === `number` && size < 1);
  if (missingDimensions.length) {
    throw new Error(
      `Specified dimensions for images must be positive numbers (> 0). 
      Problem dimensions you have are ${missingDimensions.map(dim => dim.join(`: `)).join(`, `)}`,
    );
  }

  return { ...args, width, height, aspectRatio, layout, formats };
};
