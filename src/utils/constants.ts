import { ImageFormat, Layout } from './models';
export const DEFAULT_PIXEL_DENSITIES = [1, 1.5, 2];
export const DEFAULT_BREAKPOINTS = [320, 576, 768, 1200];
export const EVERY_BREAKPOINT = [
  320,
  654,
  768,
  1024,
  1366,
  1600,
  1920,
  2048,
  2560,
  3440,
  3840,
  4096,
];
export const SUPPORTED_FORMATS: Set<ImageFormat> = new Set([
  'jpg',
  'png',
  'webp',
  'avif',
]);
export const SUPPORTED_LAYOUTS: Set<Layout> = new Set([
  `fixed`,
  `fullWidth`,
  `constrained`,
]);
