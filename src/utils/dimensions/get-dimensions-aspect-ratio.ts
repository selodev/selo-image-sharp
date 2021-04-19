interface DimensionAspectRatio {
  sourceMetadata?: any;
  width: number;
  height?: number;
  fit?: string;
}

export const getDimensionsAspectRatio = ({
  sourceMetadata,
  width,
  height,
  fit,
}: DimensionAspectRatio): {
  width: number;
  height: number;
  aspectRatio: number;
} => {
  // Calculate the eventual width/height of the image.
  const imageAspectRatio = sourceMetadata.width / sourceMetadata.height;

  switch (fit) {
    case `fill`: {
      width = width ?? sourceMetadata.width;
      height = height ?? sourceMetadata.height;
      break;
    }
    case `inside`: {
      width = width ?? Number.MAX_SAFE_INTEGER;
      height = height ?? Number.MAX_SAFE_INTEGER;
      width = Math.min(width, Math.round(height * imageAspectRatio));
      height = Math.min(height, Math.round(width / imageAspectRatio));
      break;
    }
    case `outside`: {
      width = width ?? 0;
      height = height ?? 0;
      width = Math.max(width, Math.round(height * imageAspectRatio));
      height = Math.max(height, Math.round(width / imageAspectRatio));
      break;
    }
    default: {
      width = width ?? height ? Math.round(height * imageAspectRatio) : null;
      height = height ?? width ? Math.round(width / imageAspectRatio) : null;
    }
  }

  return {
    width,
    height,
    aspectRatio: width / height,
  };
};
