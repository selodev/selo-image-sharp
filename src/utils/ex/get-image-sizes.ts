import { getMetadata } from './utils';

export const getImageSizes = async (src: string): Promise<any[]> => {
  try {
    const { width, height } = await getMetadata(src);

    let sizes = [];
    if (width > 320 && width <= 576) {
      sizes = getDimensions([0.5], width, height);
    } else if (width > 576 && width <= 768) {
      sizes = getDimensions([0.25, 0.5], width, height);
    } else if (width > 768 && width <= 992) {
      sizes = getDimensions([0.25, 0.5, 0.75], width, height);
    } else if (width > 992 && width <= 1200) {
      sizes = getDimensions([0.2, 0.4, 0.6, 0.8], width, height);
    }
    sizes = [...sizes, { width: null, height: null }];
    return sizes;
  } catch (error) {
    throw new Error(error);
  }
};

const getDimensions = (percentages: number[], width: number, height: number) =>
  percentages.map(percentage => ({
    width: round(width * percentage),
    height: round(height * percentage),
  }));

const round = (value: number) => Math.round(value);
