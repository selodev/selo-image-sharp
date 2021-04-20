/*const ob = {
  fallback: {
    src: 'assets/images/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg',
    srcset:
      'assets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-320x210.jpg 320w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-600x395.jpg 600w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-654x430.jpg 654w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-768x505.jpg 768w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1024x674.jpg 1024w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1366x898.jpg 1366w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1600x1052.jpg 1600w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1920x1263.jpg 1920w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-2048x1347.jpg 2048w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-2560x1684.jpg 2560w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-3440x2263.jpg 3440w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-3840x2526.jpg 3840w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-4096x2694.jpg 4096w',
    sizes: '(min-width: 6720px) 6720px, 100vw',
  },
  sources: [
    {
      srcset:
        'assets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-320x210.avif 320w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-600x395.avif 600w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-654x430.avif 654w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-768x505.avif 768w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1024x674.avif 1024w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1366x898.avif 1366w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1600x1052.avif 1600w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1920x1263.avif 1920w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-2048x1347.avif 2048w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-2560x1684.avif 2560w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-3440x2263.avif 3440w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-3840x2526.avif 3840w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-4096x2694.avif 4096w',
      sizes: '(min-width: 6720px) 6720px, 100vw',
      type: 'image/avif',
    },
    {
      srcset:
        'assets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-320x210.webp 320w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-600x395.webp 600w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-654x430.webp 654w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-768x505.webp 768w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1024x674.webp 1024w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1366x898.webp 1366w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1600x1052.webp 1600w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-1920x1263.webp 1920w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-2048x1347.webp 2048w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-2560x1684.webp 2560w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-3440x2263.webp 3440w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-3840x2526.webp 3840w,\nassets/images/formats/lucas-benjamin-wQLAGv4_OYs-unsplash-4096x2694.webp 4096w',
      sizes: '(min-width: 6720px) 6720px, 100vw',
      type: 'image/webp',
    },
  ],
};*/

import { AvifOptions, JpegOptions, PngOptions, ResizeOptions, WebpOptions } from 'sharp';

export type Fit = 'cover' | 'fill' | 'inside' | 'outside' | 'contain';
export type Layout = 'fixed' | 'fullWidth' | 'constrained';
export type ImageFormat = 'jpg' | 'png' | 'webp' | 'avif';
//type Optional<T> = { [P in keyof T]?: T[P] };
export type ImageSize = { src: string; width: string; type: string; layout: string };
export interface ImageProps {
  layout: string;
  placeholder: undefined;
  images: {
    fallback: { src: string; srcset: string; sizes: string };
    sources: Array<{ srcset: string; sizes: string; type: string }>;
  };
  width: number;
  height: number;
}
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
