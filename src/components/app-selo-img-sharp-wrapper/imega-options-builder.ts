import { Build } from '@stencil/core';
import { generateImageData, ImageOptions } from '../../utils';

let options: ImageOptions = {
  // Options to pass to sharp for input
  sourceOptions: {
    src: 'assets/images',
    alt: '',
    remoteUrl: 'https://isquadrepairsandiego.com',
    srcPath: 'assets/images',
    srcPathPrefix: 'src',
    srcFileName: '',

    //sourceMetadata: { width: 800, height: 150, format: 'png' },
  },
  // Options to pass to sharp for output
  destinationOptions: {
    destPath: 'assets/images-resized',
    destPathPrefix: 'src',
    digestDirPrefix: 'formats',
    // Destination file name without format
    destFileName: '',
    sourceMetadataDigestDir: 'source-metadata',
    imagePropsDigestDir: 'image-props',
  },
  // Options to pass to sharp to control cropping and other image manipulations.
  resizeOptions: {
    breakpoints: [320, 576, 768, 1200],
    pixelDensities: [1, 1.5, 2],
    // width and hight acts as maxWidth and maxHieght when used with `constrained`
    //width: 800,
    //height: 600,
    layout: 'fullWidth',
    fit: 'cover',
    //aspectRatio: 4 / 3,
    formats: ['jpg', 'png', 'avif', 'webp'],
  },
  // Options to pass to sharp when images.
  jpgOptions: { quality: 75, mozjpeg: true },
  pngOptions: { quality: 75, compressionLevel: 9 },
  webpOptions: { quality: 75, reductionEffort: 6 },
  avifOptions: { quality: 75 },
};

export const sharpImageOptionsBuilder = async (
  src: string,
  alt: string,
): Promise<ImageOptions> => {
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

    let sharpOptions: ImageOptions = {
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

    console.log(remoteUrl);
    return sharpOptions;
  } catch (error) {
    console.log(error);
  }
};

export const imageOptionsBuilder = async (src: string, alt: string): Promise<any> => {
  if (Build.isBrowser) {
    let {
      sourceOptions: { srcPath },
      destinationOptions: { destPath, imagePropsDigestDir },
    } = options;
    const file = src.split('/').pop();
    const [destFileName] = file.split('.');

    destPath = destPath + src.replace(srcPath, '').replace(`${file}`, '');

    return {
      destinationOptions: {
        destPath,
        destFileName,
        imagePropsDigestDir,
      },
    };
  } else {
    const options = await sharpImageOptionsBuilder(src, alt);
    await generateImageData(options);
  }
};
