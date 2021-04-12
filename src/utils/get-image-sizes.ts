import { Sharp } from 'sharp';

export const getImageSizes = async (src: string): Promise<any[]> => {
  try {
    const { resolve, join } = (await import('path')).default;
    const imageSrcPath = resolve(join('src', src));
    const { default: sharp } = await import('sharp');
    const pipeline: Sharp = sharp(imageSrcPath);
    const { width, height } = await pipeline.metadata();
    console.log(imageSrcPath, width, height);
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
    console.log(error);
    throw new Error(error);
  }
};

const getDimensions = (percentages: number[], width: number, height: number) =>
  percentages.map(percentage => ({
    width: round(width * percentage),
    height: round(height * percentage),
  }));

const round = (value: number) => Math.round(value);
