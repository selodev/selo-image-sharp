import { ImageOptions } from '.';

export const imageOptions: ImageOptions = {
  // Options to pass to sharp for input
  sourceOptions: {
    remoteUrl: 'https://isquadrepairsandiego.com/images/NEWLOGO.png',
    srcPath: 'assets/images',
    srcPathPrefix: 'src',
    srcFileName: 'new-logo.png',
    sourceMetadata: { width: 6720, height: 4420, format: 'jpg' },
  },
  // Options to pass to sharp for output
  destinationOptions: {
    destPath: 'assets/images',
    destPathPrefix: 'src',
    digestDirPrefix: 'formats',
    destFileName: 'new-logo',
  },
  // Options to pass to sharp to control cropping and other image manipulations.
  resizeOptions: {
    breakpoints: [320, 576, 768, 1200],
    pixelDensities: [1, 1.5, 2],
    width: 800,
    height: 600,
    layout: 'constrained',
    fit: 'cover',
    aspectRatio: 4 / 3,
    formats: ['jpg', 'avif', 'webp'],
  },
  // Options to pass to sharp when images.
  jpgOptions: { quality: 75, mozjpeg: true },
  pngOptions: { quality: 75, compressionLevel: 9 },
  webpOptions: { quality: 75, reductionEffort: 6 },
  avifOptions: { quality: 65 },
};
