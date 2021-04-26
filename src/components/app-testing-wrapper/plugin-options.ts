import { ImageOptions } from '../../utils';

export const imageOptionsBuilder = async (
  src: string,
  alt: string,
): Promise<ImageOptions> => {
  let options: ImageOptions = {
    // Options to pass to sharp for input
    sourceOptions: {
      src,
      alt,
      remoteUrl: 'https://isquadrepairsandiego.com/images',
      srcPath: 'assets/images',
      srcPathPrefix: 'src',
      srcFileName: src.split('/').pop(),
      sourceMetadataDigestDir: 'source-metadata',
      imagePropsDigestDir: 'image-props',
      //sourceMetadata: { width: 800, height: 150, format: 'png' },
    },
    // Options to pass to sharp for output
    destinationOptions: {
      destPath: 'assets/images',
      destPathPrefix: 'src',
      digestDirPrefix: 'formats',
      // Destination file name without format
      destFileName: src.split('/').pop().split('.')[0],
    },
    // Options to pass to sharp to control cropping and other image manipulations.
    resizeOptions: {
      breakpoints: [320, 576, 768, 1200],
      pixelDensities: [1, 1.5, 2],
      // width and hight acts as maxWidth and maxHieght when used with `constrained`
      //width: 800,
      //height: 600,
      layout: 'constrained',
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

  let {
    sourceOptions,
    sourceOptions: { remoteUrl, srcPath },
  } = options;
  remoteUrl += src.replace(srcPath, '');
  options = { ...options, sourceOptions: { ...sourceOptions, remoteUrl } };

  return options;
};
