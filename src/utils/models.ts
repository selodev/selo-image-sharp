import { AvifOptions, JpegOptions, PngOptions, ResizeOptions, WebpOptions } from 'sharp';

//type Optional<T> = { [P in keyof T]?: T[P] };

export type Fit = 'cover' | 'fill' | 'inside' | 'outside' | 'contain';
export type Layout = 'fixed' | 'fullWidth' | 'constrained';
export type ImageFormat = 'jpg' | 'png' | 'webp' | 'avif';

export interface ImageSources {
  [format: string]: Promise<ImageSource>[];
}
export type ImageSource = { src: string; width: number; type: string };

export interface ImageProps {
  layout: string;
  placeholder: undefined;
  images: {
    fallback: Image;
    sources: Array<Source>;
  };
  width: number;
  height: number;
}
export type Source = { type: string; srcset: string; sizes: string };
export interface Image {
  type: string;
  src: string;
  srcset: string;
  sizes: string;
}

export interface SourceMetadata {
  width: number;
  height: number;
  format: string;
}
export interface CalculatedDimension {
  width: number;
  height: number;
  aspectRatio: number;
}
export interface DimensionAspectRatio {
  sourceMetadata?: any;
  width: number;
  height?: number;
  fit?: string;
}
export interface ResizingOptions extends ResizeOptions {
  dominantColor?: string;
  aspectRatio?: number;
  // Output widths to generate for full width images.
  breakpoints?: Array<number>;
  //For fixed images: [1, 2] For constrained: [0.25, 0.5, 1, 2]
  pixelDensities?: Array<number>;
  layout?: Layout;
  formats?: Array<ImageFormat> | Set<ImageFormat>;
  format?: ImageFormat;
  //cropFocus: 'entropy' | 'attention';
}
/** Passing @baseUrl will fecth remote image and cteate it, at the fileName and sourcePath specified. */
export interface SourceOptions {
  remoteUrl?: string;
  srcPath?: string;
  srcPathPrefix?: string;
  srcFileName?: string;
  /** Use source metada for remote images only such as CDN. */
  sourceMetadata?: SourceMetadata;
}
export interface DestinationOptions {
  destPath?: string;
  destPathPrefix?: string;
  digestDirPrefix?: string;
  destFileName?: string;
}
export interface ImageOptions {
  sourceOptions?: SourceOptions;
  destinationOptions?: DestinationOptions;
  // Options to pass to sharp to control cropping and other image manipulations.
  resizeOptions?: ResizingOptions;
  // Options to pass to sharp when images.
  jpgOptions?: JpegOptions;
  pngOptions?: PngOptions;
  webpOptions?: WebpOptions;
  avifOptions?: AvifOptions;
}
