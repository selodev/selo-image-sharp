import { Sharp } from 'sharp';
import { ImageMetadata } from './models';

export const getMetadata = async (src: string): Promise<ImageMetadata> => {
  const { resolve, join } = (await import('path')).default;
  const imageSrcPath = resolve(join('src', src));
  const { default: sharp } = await import('sharp');
  const pipeline: Sharp = sharp(imageSrcPath);
  const { width, height, format } = await pipeline.metadata();
  const { dominant } = await pipeline.stats();
  // Fallback in case sharp doesn't support dominant
  const dominantColor = dominant ? rgbToHex(dominant.r, dominant.g, dominant.b) : `#000000`;
  return { width, height, format, dominantColor };
};

export function rgbToHex(red, green, blue) {
  return `#${(blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1)}`;
}
