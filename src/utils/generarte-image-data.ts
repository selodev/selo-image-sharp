import { calculateImageSizes } from './calculate-image-sizes';
import {
  getHtmlImageSizesAttribute,
  getHtmlImageSrcsetAttribute,
} from './generate-attributes';
import { transformImage } from './transform-image';
import { imageOptions, ImageOptions } from '.';

export const generateImageData = async (
  options: ImageOptions = imageOptions,
) => {
  const {
    resizeOptions: { width, height, layout },
    inputOptions: { srcPath, srcFileName },
  } = options;
  const {
    sourceImageDimensions,
    requestedDimensions,
    calculatedDimensions,
  } = await calculateImageSizes(options.resizeOptions, options.inputOptions);

  const transformImages = transformImage(options, calculatedDimensions);
  console.log(transformImages);

  console.log(calculatedDimensions);
  const htmlImageSrcsetAttribute = getHtmlImageSrcsetAttribute(
    calculatedDimensions,
  );

  const htmlImageSizesAttribute = getHtmlImageSizesAttribute(
    sourceImageDimensions.width,
    layout,
  );

  const imageProps = {
    layout,
    placeholder: undefined,
    //backgroundColor,
    images: {
      fallback: {
        src: srcPath + '/' + srcFileName,
        srcset: htmlImageSrcsetAttribute,
        sizes: htmlImageSizesAttribute,
      },
      sources: [],
    },
    width,
    height,
  };
  switch (layout) {
    case `fixed`:
      imageProps.width = requestedDimensions.width;
      imageProps.height = requestedDimensions.height;
      break;

    case `fullWidth`:
      imageProps.width = 1;
      imageProps.height = 1 / sourceImageDimensions.aspectRatio;
      break;

    case `constrained`:
      imageProps.width = width || sourceImageDimensions.width || 1;
      imageProps.height =
        (imageProps.width || 1) / sourceImageDimensions.aspectRatio;
  }
  return imageProps;
};
