

const ob = {
  inputOptions: {
    srcPath: 'assets/images',
    srcPathPrefix: 'src',
    srcFileName: 'lucas-benjamin-wQLAGv4_OYs-unsplash.jpg',
    sourceMetadata: {
      width: 6720,
      height: 4420,
      format: 'jpg',
    },
  },
  outputOptions: {
    destPath: 'assets/images',
    destPathPrefix: 'src',
    digestDirPrefix: 'formats',
    destFileName: 'lucas-benjamin-wQLAGv4_OYs-unsplash-6720x4420.jpg',
  },
  resizeOptions: {
    breakpoints: [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
    pixelDensities: [1, 1.5, 2],
    width: 6720,
    height: 4420,
    layout: 'fullWidth',
    fluidWidth: 800,
    fixedWidth: 800,
    aspectRatio: 1.3333333333333333,
    formats: {},
    format: 'jpg',
  },
  jpgOptions: {
    quality: 75,
    mozjpeg: true,
  },
};






import { AvifOptions, JpegOptions, PngOptions, ResizeOptions, WebpOptions } from 'sharp';

export type Fit = 'cover' | 'fill' | 'inside' | 'outside' | 'contain';
export type Layout = 'fixed' | 'fullWidth' | 'constrained';
export type ImageFormat = 'jpg' | 'png' | 'webp' | 'avif';
//type Optional<T> = { [P in keyof T]?: T[P] };

export interface SourceMetadata {
  width: number;
  height: number;
  format: string;
  dominantColor?: string;
}
export interface HTMLImageAttributes {
  // The <img> sizes attribute, passed to the img tag.
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  srcset?: string;
}
export interface CalculatedDimension {
  width: number;
  height: number;
  aspectRatio: number;
}
export interface ResizingOptions extends ResizeOptions {
  aspectRatio?: number;
  // Output widths to generate for full width images.
  breakpoints?: Array<number>;
  //For fixed images: [1, 2] For constrained: [0.25, 0.5, 1, 2]
  pixelDensities?: Array<number>;
  layout?: Layout;
  formats?: Array<ImageFormat> | Set<ImageFormat>;
  format?: ImageFormat;
  fluidWidth?: number;
  fixedWidth?: number;
}
export interface inputOptions {
  srcPath?: string;
  srcPathPrefix?: string;
  srcFileName?: string;
  sourceMetadata?: SourceMetadata;
}
export interface outputOptions {
  destPath?: string;
  destPathPrefix?: string;
  digestDirPrefix?: string;
  destFileName?: string;
}
export interface ImageOptions {
  inputOptions?: inputOptions;
  outputOptions?: outputOptions;
  // Options to pass to sharp to control cropping and other image manipulations.
  resizeOptions?: ResizingOptions;
  // Options to pass to sharp when images.
  jpgOptions?: JpegOptions;
  pngOptions?: PngOptions;
  webpOptions?: WebpOptions;
  avifOptions?: AvifOptions;
}
