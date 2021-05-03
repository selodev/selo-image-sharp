import { ImageOptions } from '../../utils/sharp';
import { Build } from '@stencil/core';
import { ResizingOptions } from '../../utils/sharp/models';

//import { generateImageData, ImageOptions } from '../../utils';
let sourceOptions = {
  src: '',
  alt: '',
  remoteUrl: 'http://localhost:1313',
  srcPath: 'assets/images',
  srcPathPrefix: 'src',
  srcFileName: '',

  //sourceMetadata: { width: 800, height: 150, format: 'png' },
};
let destinationOptions = {
  destPath: 'assets/images-resized',
  destPathPrefix: 'src',
  digestDirPrefix: 'formats',
  // Destination file name without format
  destFileName: '',
  sourceMetadataDigestDir: 'source-metadata',
  imagePropsDigestDir: 'image-props',
};
let resizeOptions: ResizingOptions = {
  breakpoints: [],
  pixelDensities: [],
  // width and hight acts as maxWidth and maxHieght when used with `constrained`
  width: 300,
  height: 170,
  layout: 'fixed',
  fit: 'cover',
  position: 'north',
  //aspectRatio: 4 / 3,
  formats: ['png', 'avif', 'webp'],
  primaryFormat: 'png',
};
let options: ImageOptions = {
  // Options to pass to sharp for input
  sourceOptions,
  // Options to pass to sharp for output
  destinationOptions,
  // Options to pass to sharp to control cropping and other image manipulations.
  resizeOptions,
  // Options to pass to sharp when images.
  jpgOptions: { quality: 75, mozjpeg: true },
  pngOptions: { quality: 75, compressionLevel: 9 },
  webpOptions: { quality: 75, reductionEffort: 6 },
  avifOptions: { quality: 75 },
};

export const sharpImageOptionsBuilder = async (src, alt) => {
  try {
    const { parse } = (await import('path')).default;
    const { dir: urlSrcPath, base: urLSrcFileName, name: destFileName } = parse(src);

    const { sourceOptions, destinationOptions } = options;

    let { destPath } = destinationOptions;
    let { remoteUrl, srcPath } = sourceOptions;

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

export const generateImageDataOptions = async (src, alt): Promise<any> => {
  if (Build.isBrowser) {
    let { srcPath, src } = sourceOptions;
    let { destPath, imagePropsDigestDir } = destinationOptions;
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
  } else if (Build.isServer) {
    const sharpOptions: any = await sharpImageOptionsBuilder(src, alt);
    const { generateImageData } = await import('../../utils/sharp');
    await generateImageData(sharpOptions);
  }
};
