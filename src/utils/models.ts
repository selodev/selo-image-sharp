import {
  AvifOptions,
  JpegOptions,
  PngOptions,
  ResizeOptions,
  WebpOptions,
} from 'sharp';

export type Fit = 'cover' | 'fill' | 'inside' | 'outside' | 'contain';
export type Layout = 'fixed' | 'fullWidth' | 'constrained';
export type ImageFormat = 'jpg' | 'png' | 'webp' | 'avif';
//type Optional<T> = { [P in keyof T]?: T[P] };
export interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  density?: number;
  dominantColor?: string;
}
export interface srcMetadata {
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
export interface CalculateWithHeightRatio {
  srcMetadata?: any;
  width?: number;
  height?: number;
  aspectRatio?: number;
  fit?: string;
  layout?: string;
  allowOversizedDimensions?: boolean;
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
  allowOversizedDimensions?: boolean;
  formats?: Array<ImageFormat>;
  format?: ImageFormat;
  fluidWidth: number;
  fixedWidth: number;
}
export interface inputOptions {
  srcPath?: string;
  srcPathPrefix?: string;
  srcFileName?: string;
  srcMetadata?: srcMetadata;
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
export interface ISharpImageArgs {
  layout?: Layout;
  formats?: Set<ImageFormat>;
  format?: string;
  placeholder?: 'tracedSVG' | 'dominantColor' | 'blurred' | 'none';
  src?: string;
  srcPath?: string;
  srcPathPrefix?: string;
  inputFile?: string;
  destPath?: string;
  destPathPrefix?: string;
  digestDirPrefix?: string;
  outputFile?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;

  quality?: number;

  // Output widths to generate for full width images.
  breakpoints?: Array<number>;
  fit?: Fit;
  // Options to pass to sharp to control cropping and other image manipulations.
  resizeOptions?: ResizeOptions;
  // Options for the low-resolution placeholder image. Ignored unless placeholder is blurred.
  blurredOptions?: { width?: number; toFormat?: ImageFormat };
  backgroundColor?: string;
  // Choose the style of temporary image shown while the full image loads.
  placeholderURL?: string;
  srcMetadata?: srcMetadata;
  // Options to pass to sharp when images.
  jpgOptions?: JpegOptions;
  pngOptions?: PngOptions;
  webpOptions?: WebpOptions;
  avifOptions?: AvifOptions;
}

export interface IImageSizeArgs {
  src?: string;
  width?: number;
  height?: number;
  layout?: Layout;
  filename?: string;
  pixelDensities?: Array<number>;
  breakpoints?: Array<number>;
  fit?: Fit;
  srcMetadata?: { width: number; height: number };
  aspectRatio?: number;
}

export interface IImageSizes {
  sizes: Array<number>;
  presentationWidth: number;
  presentationHeight: number;
  aspectRatio: number;
  unscaledWidth: number;
}

export interface IImage {
  src: string;
  width: number;
  height: number;
  format: ImageFormat;
}
