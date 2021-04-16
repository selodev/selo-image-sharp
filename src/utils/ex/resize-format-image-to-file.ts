import { Sharp } from 'sharp';
import { ISharpImageArgs } from '../models';

export const resizeFormatImageToFile = async ({
  srcPath,
  srcPathPrefix,
  destPath,
  destPathPrefix,
  digestDirPrefix,
  inputFile,
  outputFile,
  width,
  height,
  format,
  fit,
  quality,
  jpgOptions,
  pngOptions,
  webpOptions,
  avifOptions,
}: ISharpImageArgs) => {
  try {
    const { default: fs } = await import('fs');
    const { resolve, join } = (await import('path')).default;
    const imageSrcPath = resolve(
      join(srcPathPrefix, ...srcPath.split('/'), `${inputFile}`),
    );
    const imageDestPath = resolve(
      join(destPathPrefix, ...destPath.split('/'), digestDirPrefix),
    );
    const absoluteDest = resolve(join(imageDestPath, outputFile));
    if (fs.existsSync(absoluteDest)) {
      console.log('File exists ', inputFile);
      return 'File exists ' + inputFile;
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
      pipeline.resize(width, height, { fit });
    }

    if (format == 'jpg') {
      pipeline.jpeg({ quality, ...jpgOptions });
    } else if (format == 'png') {
      pipeline.png({ quality, ...pngOptions });
    } else if (format == 'avif') {
      pipeline.avif({ quality, ...avifOptions });
    } else if (format == 'webp') {
      pipeline.webp({ quality, ...webpOptions });
    } else {
      throw new Error('Image format is not supported.');
    }
    const data = await pipeline.toFile(absoluteDest);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
