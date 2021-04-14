import { Sharp } from 'sharp';
import { ImageParams } from '../../models/models';
import { getImageInformation } from './get-image-information';

export const resizeFormatImageToFile = async ({ src, width, height, format, quality }: ImageParams) => {
  const { file, srcPath, formattedImageName } = getImageInformation({
    src,
    width,
    height,
    format,
  });
  try {
    const { default: fs } = await import('fs');
    const { resolve, join } = (await import('path')).default;
    const imageSrcPath = resolve(join('src', ...srcPath.split('/'), `${file}`));
    const imageDestPath = resolve(join('src', ...srcPath.split('/'), 'formats', format));
    const absoluteDest = resolve(join(imageDestPath, formattedImageName));
    if (fs.existsSync(absoluteDest)) {
      console.log('File exists ', file);
      return 'File exists ' + file;
    }
    if (!fs.existsSync(imageDestPath)) {
      fs.mkdirSync(imageDestPath, { recursive: true });
    }
    const { default: sharp } = await import('sharp');
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
      throw new Error('Image format is not supported.');
    }
    const data = await pipeline.toFile(absoluteDest);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
