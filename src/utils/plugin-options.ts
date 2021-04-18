import { ImageOptions } from '.';

export const imageOptions: ImageOptions = {
  inputOptions: {
    srcPath: 'assets/images',
    srcPathPrefix: 'src',
    srcFileName: 'lucas-benjamin-wQLAGv4_OYs-unsplash.jpg',
  },
  outputOptions: {
    destPath: 'assets/images',
    destPathPrefix: 'src',
    digestDirPrefix: 'formats',
    destFileName: 'lucas-benjamin-wQLAGv4_OYs-unsplash',
  },
  // Options to pass to sharp to control cropping and other image manipulations.
  resizeOptions: {
    breakpoints: [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
    pixelDensities: [1, 1.5, 2],
    width: 600,
    height: 800,
    layout: 'fullWidth',
    allowOversizedDimensions: true,
    fluidWidth: 800,
    fixedWidth: 800,
    aspectRatio: 4 / 3,
    formats: ['jpg', 'avif', 'webp'],
  },
  // Options to pass to sharp when images.
  jpgOptions: { quality: 75, mozjpeg: true },
  pngOptions: { quality: 75, compressionLevel: 9 },
  webpOptions: { quality: 75, reductionEffort: 6 },
  avifOptions: { quality: 65 },
};
