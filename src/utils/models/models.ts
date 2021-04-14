import { AvifOptions, JpegOptions, PngOptions, WebpOptions } from 'sharp';

export type Fit = 'cover' | 'fill' | 'inside' | 'outside' | 'contain';
export type Layout = 'fixed' | 'fullWidth' | 'constrained';
export type ImageFormat = 'jpg' | 'png' | 'webp' | 'avif' | 'auto' | '';

export interface ISharpImageArgs {
  layout?: Layout;
  formats?: Array<ImageFormat>;
  placeholder?: 'tracedSVG' | 'dominantColor' | 'blurred' | 'none';
  src: string;
  dest: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  // The <img> sizes attribute, passed to the img tag.
  sizes?: string;
  quality?: number;
  //For fixed images: [1, 2] For constrained: [0.25, 0.5, 1, 2]
  pixelDensities?: Array<number>;
  // Output widths to generate for full width images.
  breakpoints?: Array<number>;
  fit?: Fit;
  // Options to pass to sharp to control cropping and other image manipulations.
  transformOptions?: {
    fit?: Fit;
    cropFocus?: number | string;
  };
  // Options for the low-resolution placeholder image. Ignored unless placeholder is blurred.
  blurredOptions?: { width?: number; toFormat?: ImageFormat };
  backgroundColor?: string;
  // Choose the style of temporary image shown while the full image loads.
  placeholderURL?: string;
  sourceMetadata?: { width: number; height: number; format: ImageFormat };
  // Options to pass to sharp when images.
  jpgOptions?: JpegOptions;
  jpegProgressive: boolean;
  pngOptions?: PngOptions;
  pngCompressionLevel: number;
  webpOptions?: WebpOptions;
  avifOptions?: AvifOptions;
}

export interface IImageSizeArgs {
  src?: string;
  width?: number;
  height?: number;
  layout?: Layout;
  filename: string;
  pixelDensities?: Array<number>;
  breakpoints?: Array<number>;
  fit?: Fit;
  sourceMetadata: { width: number; height: number };
  imgDimensions: any;
}

export interface IImageSizes {
  sizes?: Array<number>;
  presentationWidth?: number;
  presentationHeight?: number;
  aspectRatio?: number;
  unscaledWidth?: number;
}

export interface IImage {
  src: string;
  width: number;
  height: number;
  format: ImageFormat;
}

export interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  density?: number;
  dominantColor?: string;
}
