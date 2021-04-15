import { SUPPORTED_FORMATS } from '../constants';
import { ImageFormat, ISharpImageArgs } from '../models/models';
import { setDefaultDimentions } from '../generate-dimensions/set-default-dimensions';
import { calculateImageSizes } from '../generate-dimensions/calculateImageSizes';
import { resizeFormatImageToFile } from '../ex/resize-format-image-to-file';
import { getSizes, getSrcSet } from '../image-utils/utils';
export const generateImageData = async (args: ISharpImageArgs) => {
  args = await setDefaultDimentions(args);
  const {
    src,
    file,
    layout = 'constrained',
    placeholder = `dominantColor`,
    quality,
    aspectRatio,
    sourceMetadata,
    width,
    height,
    fit,
    backgroundColor,
  } = args;
  let { formats } = args;
  formats = new Set(formats) ?? SUPPORTED_FORMATS;

  const imageSizes: {
    sizes: Array<number>;
    presentationWidth: number;
    presentationHeight: number;
    aspectRatio: number;
    unscaledWidth: number;
  } = calculateImageSizes({
    width,
    height,
    filename: file,
    layout,
    sourceMetadata: sourceMetadata,
  });
  const transforms = [];
  const images = [];
  const srcSet = getSrcSet(transforms);

  const sizes = args.sizes || getSizes(imageSizes.unscaledWidth, layout);

  const primaryIndex =
    layout === `fullWidth`
      ? imageSizes.sizes.length - 1 // The largest image
      : imageSizes.sizes.findIndex(size => size === imageSizes.unscaledWidth);

  if (primaryIndex === -1) {
    console.error(
      `No image of the specified size found. Images may not have been processed correctly.`,
    );
    return undefined;
  }

  const primaryImage = images[primaryIndex];

  if (!images?.length) {
    return undefined;
  }
  const imageProps = {
    layout,
    placeholder: undefined,
    backgroundColor,
    images: {
      fallback: {
        src: primaryImage.src,
        srcSet,
        sizes,
      },
      sources: [],
    },
    width: 0,
    height: 0,
  };
  primaryImage.aspectRatio = primaryImage.aspectRatio || 1;

  switch (layout) {
    case `fixed`:
      imageProps.width = imageSizes.presentationWidth;
      imageProps.height = imageSizes.presentationHeight;
      break;

    case `fullWidth`:
      imageProps.width = 1;
      imageProps.height = 1 / primaryImage.aspectRatio;
      break;

    case `constrained`:
      imageProps.width = args.width || primaryImage.width || 1;
      imageProps.height = (imageProps.width || 1) / primaryImage.aspectRatio;
  }
  return imageProps;
};
