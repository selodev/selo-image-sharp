import { Build } from '@stencil/core';
//import { generateImageData, ImageOptions } from '../../utils';
let sourceOptions = {
  src: 'assets/images',
  alt: '',
  remoteUrl: 'https://isquadrepairsandiego.com',
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
let resizeOptions = {
  breakpoints: [320, 576, 768, 1200],
  pixelDensities: [1, 1.5, 2],
  // width and hight acts as maxWidth and maxHieght when used with `constrained`
  //width: 800,
  //height: 600,
  layout: 'constrained',
  fit: 'cover',
  //aspectRatio: 4 / 3,
  formats: ['jpg', 'png', 'avif', 'webp'],
  format: 'jpg',
};
let options = {
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

export const imageOptionsBuilder = async (src: string, alt: string): Promise<any> => {
  if (Build.isBrowser) {
    let { srcPath } = sourceOptions;
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
    const { sharpImageOptionsBuilder } = await import('./sharp-image-options-builder');
    const sharpOptions: any = await sharpImageOptionsBuilder(src, alt, options);
    const { generateImageData } = await import('../../utils');
    await generateImageData(sharpOptions);
  }
};
