import { Sharp } from 'sharp';
import { getImageInformation } from './get-image-information';
import { ImageParams } from '../models/models';

export const resizeFormatImageToFile = async ({ src, width, height, format, quality }: ImageParams) => {
  const { file, srcPath, formattedImageName } = getImageInformation({
    src,
    width,
    height,
    format,
    quality,
  });
  try {
    const { default: fs } = await import('fs');
    const { resolve, join } = (await import('path')).default;
    const imageSrcPath = resolve(join('src', ...srcPath.split('/'), `${file}`));
    const imageDestPath = resolve(join('src', ...srcPath.split('/'), 'formats', format));
    const absoluteDest = resolve(imageDestPath, formattedImageName);
    if (fs.existsSync(absoluteDest)) {
      return;
    }
    if (!fs.existsSync(imageDestPath)) {
      fs.mkdirSync(imageDestPath, { recursive: true });
    }
    const { default: sharp } = await import('sharp');
    sharp.cache(false);
    const pipeline: Sharp = sharp(imageSrcPath);
    const { width: metaDataWidth, height: metaDataHeight } = await pipeline.metadata();
    if (metaDataWidth && metaDataHeight) {
      width = width && metaDataWidth >= width ? width : null;
      height = height && metaDataHeight >= height ? height : null;
    }
    if (width || height) {
      pipeline.resize(width, height, { fit: 'outside' });
    }
    if (format == 'avif') {
      pipeline.avif({ quality });
    } else if (format == 'webp') {
      pipeline.webp({ quality });
    } else {
      throw new Error('Imagee format is not supported.');
    }
    return await pipeline.toFile(absoluteDest);
  } catch (error) {
    console.log(error);
  }
};
