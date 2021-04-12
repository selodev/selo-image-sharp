import { Sharp } from 'sharp';
import { getImageInformation } from './utils/get-image-information';
import { ImageParams } from './models/models';

export const resizeFormatImages = async (src: string, quality: number, formats: string[]) => {
  const sizes = await getImageSizes(src);
  let promises = [];
  formats.forEach(async format => {
    promises = [
      ...promises,
      ...sizes.map(({ width, height }) =>
        resizeFormatImageToFile({
          src,
          width,
          height,
          format,
          quality,
        }),
      ),
    ];
  });
  const images = await Promise.all(promises);
  return images;
};
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

    if (!fs.existsSync(imageDestPath)) {
      fs.mkdirSync(imageDestPath, { recursive: true });
    }

    const { default: sharp } = await import('sharp');
    sharp.cache(false);
    sharp.simd(false);
    sharp.concurrency(1);
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
    console.log(error);
    throw new Error(error);
  }
};

export const getImageSizes = async (src: string): Promise<any[]> => {
  try {
    const { resolve, join } = (await import('path')).default;
    const imageSrcPath = resolve(join('src', src));
    const { default: sharp } = await import('sharp');
    sharp.cache(false);
    sharp.simd(false);
    sharp.concurrency(1);
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
