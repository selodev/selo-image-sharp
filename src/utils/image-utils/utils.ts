import { IImage, Layout } from '../models/models';

const warn = (message: string): void => console.warn(message);

export const sortNumeric = (a: number, b: number): number => a - b;

export const getSizes = (width: number, layout: Layout): string | undefined => {
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

export const getSrcSet = (images: Array<IImage>): string =>
  images.map(image => `${image.src} ${image.width}w`).join(`,\n`);

export const dedupeAndSortDensities = (values: Array<number>): Array<number> =>
  Array.from(new Set([1, ...values])).sort(sortNumeric);
