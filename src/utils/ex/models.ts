//type Optional<T> = { [P in keyof T]?: T[P] };

export interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  density?: number;
  dominantColor?: string;
}
