export const getDimensionsAndAspectRatio = (
  actualImageDimensions,
  definedImageDimensions,
  fit,
): { width: number; height: number; aspectRatio: number } => {
  // Calculate the eventual width/height of the image.
  const imageAspectRatio = actualImageDimensions.width / actualImageDimensions.height;
  let { width, height } = definedImageDimensions;

  switch (fit) {
    case `fill`: {
      width = width ?? actualImageDimensions.width;
      height = height ?? actualImageDimensions.height;
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
