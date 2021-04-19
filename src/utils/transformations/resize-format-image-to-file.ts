import { Sharp } from 'sharp';
import { ImageOptions } from '../models';

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
    const {
      srcPath,
      srcPathPrefix,
      srcFileName,
      sourceMetadata: { width: metadataWidth, height: metadataHeight },
    } = inputOptions;
    console.log(srcPath, srcPathPrefix, srcFileName);

    const imageSrcPath = resolve(
      join(srcPathPrefix, ...srcPath.split('/'), `${srcFileName}`),
    );
    const { destPath, destPathPrefix, digestDirPrefix, destFileName } = outputOptions;
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
    if (metadataWidth && metadataHeight) {
      width = width && metadataWidth >= width ? width : null;
      height = height && metadataHeight >= height ? height : null;
    }
    if (width || height) {
      pipeline.resize(width, height, { fit });
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
    return await pipeline.toFile(absoluteDest);
  } catch (error) {
    throw new Error(error);
  }
};
