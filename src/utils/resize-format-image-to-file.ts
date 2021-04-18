import { Sharp } from 'sharp';
import { ImageOptions } from './models';

export const resizeFormatImageToFile = async ({
  inputOptions,
  outputOptions,
  resizeOptions,
  jpgOptions,
  pngOptions,
  webpOptions,
  avifOptions,
}: ImageOptions) => {
  try {
    const { default: fs } = await import('fs');
    const { resolve, join } = (await import('path')).default;
    const { srcPath, srcPathPrefix, srcFileName } = inputOptions;
    console.log(srcPath,srcPathPrefix,srcFileName)

    const imageSrcPath = resolve(
      join(srcPathPrefix, ...srcPath.split('/'), `${srcFileName}`),
    );
    const {
      destPath,
      destPathPrefix,
      digestDirPrefix,
      destFileName,
    } = outputOptions;
    let { width, height, fit, format } = resizeOptions;
    const imageDestPath = resolve(
      join(destPathPrefix, ...destPath.split('/'), digestDirPrefix, format),
    );
    const absoluteDest = resolve(join(imageDestPath, destFileName));
    if (fs.existsSync(absoluteDest)) {
      console.log('File exists ', imageSrcPath);
      return 'File exists ' + imageSrcPath;
    }
    if (!fs.existsSync(imageDestPath)) {
      fs.mkdirSync(imageDestPath, { recursive: true });
    }
    const { default: sharp } = await import('sharp');
    const pipeline: Sharp = sharp(imageSrcPath);
    const {
      width: metaDataWidth,
      height: metaDataHeight,
    } = await pipeline.metadata();
    if (metaDataWidth && metaDataHeight) {
      width = width && metaDataWidth >= width ? width : null;
      height = height && metaDataHeight >= height ? height : null;
    }
    if (width || height) {
      pipeline.resize(width, null, { fit });
    }

    if (format == 'jpg') {
      pipeline.jpeg({ ...jpgOptions });
    } else if (format == 'png') {
      pipeline.png({ ...pngOptions });
    } else if (format == 'avif') {
      pipeline.avif({ ...avifOptions });
    } else if (format == 'webp') {
      pipeline.webp({ ...webpOptions });
    } else {
      throw new Error('Image format is not supported.');
    }
    const data = await pipeline.toFile(absoluteDest);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
