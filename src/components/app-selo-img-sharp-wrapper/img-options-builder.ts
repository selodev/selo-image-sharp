import { ImageOptions } from '../../utils/sharp';
import { generateImageDataOptions } from '../../utils/image-options-builder/generate-image-optsions-data';
import { ResizingOptions } from '../../utils/sharp/models';

//import { generateImageData, ImageOptions } from '../../utils';
let sourceOptions = {
  src: '',
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
let resizeOptions: ResizingOptions = {
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

export const imageOptionsBuilder = async (src: string, alt: string): Promise<any> => {
  const sharpImageOptions = { ...options, sourceOptions: { ...sourceOptions, src, alt } };
  return generateImageDataOptions(sharpImageOptions);
};
