import { Sharp } from 'sharp';
import { srcMetadata } from '../models';

export const getMetadataStats = async ({
  srcPath,
  srcPathPrefix,
  srcFileName,
}): Promise<srcMetadata> => {
  const { resolve, join } = (await import('path')).default;
  const imageSrcPath = resolve(
    join(srcPathPrefix, ...srcPath.split('/'), `${srcFileName}`),
  );
  const { default: sharp } = await import('sharp');
  const pipeline: Sharp = sharp(imageSrcPath);
  const { width, height, format } = await pipeline.metadata();
  const { dominant } = await pipeline.stats();
  // Fallback in case sharp doesn't support dominant
  const dominantColor = dominant
    ? rgbToHex(dominant.r, dominant.g, dominant.b)
    : `#000000`;
  console.log(width, height, format);
  return { width, height, format, dominantColor };
};

export function rgbToHex(red, green, blue) {
  return `#${(blue | (green << 8) | (red << 16) | (1 << 24))
    .toString(16)
    .slice(1)}`;
}
