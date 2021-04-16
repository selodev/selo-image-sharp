import {
  AvifOptions,
  FitEnum,
  JpegOptions,
  PngOptions,
  WebpOptions,
} from 'sharp';

export interface ImageParams {
  src: string;
  dest?: string;
  width?: number;
  height?: number;
  format: string;
  fit?: keyof FitEnum;
  quality?: number;
  // Options to pass to sharp when images.
  jpgOptions?: JpegOptions;
  mozjpeg?: boolean;
  jpegProgressive?: boolean;
  pngOptions?: PngOptions;
  pngCompressionLevel?: number;
  webpOptions?: WebpOptions;
  avifOptions?: AvifOptions;
}
