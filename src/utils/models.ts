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
  formats?: Array<ImageFormat>;
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
