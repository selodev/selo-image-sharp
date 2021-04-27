import { Build } from '@stencil/core';
import { generateImageData, ImageOptions } from '../../utils';

let options: ImageOptions = {
  // Options to pass to sharp for input
  sourceOptions: {
    src: 'assets/images/',
    alt: '',
    remoteUrl: 'https://isquadrepairsandiego.com',
    srcPath: '',
    srcPathPrefix: 'src',
    srcFileName: '',

    //sourceMetadata: { width: 800, height: 150, format: 'png' },
  },
  // Options to pass to sharp for output
  destinationOptions: {
    destPath: 'assets/images',
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
  const { parse } = (await import('path')).default;
  const { dir: srcPath, base: srcFileName, name: destFileName } = parse(src);

  const { sourceOptions, destinationOptions } = options;
  let {
    sourceOptions: { remoteUrl },
  } = options;

  remoteUrl += src.replace('assets', '');

  let sharpOptions: ImageOptions = {
    ...options,
    sourceOptions: { ...sourceOptions, src, alt, srcPath, srcFileName, remoteUrl },
    destinationOptions: {
      ...destinationOptions,
      destFileName,
      destPath: srcPath,
    },
  };

  console.log(remoteUrl);
  return sharpOptions;
};

export const imageOptionsBuilder = async (src: string, alt: string): Promise<any> => {
  if (Build.isBrowser) {
    let {
      destinationOptions: { imagePropsDigestDir },
    } = options;
    const file = src.split('/').pop();
    const [destFileName] = file.split('.');
    const destPath = src.replace(`${file}`, '');

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
