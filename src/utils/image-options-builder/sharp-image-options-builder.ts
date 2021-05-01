import { ImageOptions } from '../sharp';

export const sharpImageOptionsBuilder = async (options: ImageOptions) => {
  const {
    sourceOptions: { src, alt },
  } = options;
  try {
    const { parse } = (await import('path')).default;
    const { dir: urlSrcPath, base: urLSrcFileName, name: destFileName } = parse(src);

    const { sourceOptions, destinationOptions } = options;
    let {
      destinationOptions: { destPath },
      sourceOptions: { remoteUrl, srcPath },
    } = options;

    if (!urlSrcPath.includes(srcPath)) {
      throw new Error(`${urlSrcPath} doesn't match ${srcPath} path.`);
    }

    remoteUrl += src.replace('assets', '');
    const removedSrcPath = urlSrcPath.replace(srcPath, '');
    destPath += removedSrcPath;

    let sharpOptions = {
      ...options,
      sourceOptions: {
        ...sourceOptions,
        src,
        alt,
        srcPath: urlSrcPath,
        srcFileName: urLSrcFileName,
        remoteUrl,
      },
      destinationOptions: {
        ...destinationOptions,
        destPath,
        destFileName,
      },
    };

    return sharpOptions;
  } catch (error) {
    console.error(error);
  }
};
