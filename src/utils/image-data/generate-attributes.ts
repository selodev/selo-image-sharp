import { Layout } from '../models';

export const getSizesAttribute = (width: number, layout: Layout): string | undefined => {
  switch (layout) {
    // If screen is wider than the max size, image width is the max size,
    // otherwise it's the width of the screen
    case `constrained`:
      return `(min-width: ${width}px) ${width}px, 100vw`;

    // Image is always the same width, whatever the size of the screen
    case `fixed`:
      return `${width}px`;

    // Image is always the width of the screen
    case `fullWidth`:
      return `100vw`;

    default:
      return undefined;
  }
};

export const getSrcsetAttribute = (images: Array<any>): string =>
  images.map(image => `${image.src} ${image.width}w`).join(',');
