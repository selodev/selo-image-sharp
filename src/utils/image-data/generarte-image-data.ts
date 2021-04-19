import { getSrcsetAttribute, getSizesAttribute } from './generate-attributes';
//import { transformImage } from './transform-image';
import { imageOptions, ImageOptions } from '..';
import getCalculatedDimensions from '../dimensions';
export const generateImageData = async (options: ImageOptions = imageOptions) => {
  const {
    resizeOptions: { width, height, layout },
    inputOptions: { srcPath, srcFileName },
  } = options;

  const {
    sourceDimensions,
    requestedDimensions,
    layoutDimensions,
  } = await getCalculatedDimensions(options);

  console.log(layoutDimensions);

  const imageProps = {
    layout,
    placeholder: undefined,
    //backgroundColor,
    images: {
      fallback: {
        src: srcPath + '/' + srcFileName,
        srcset: getSrcsetAttribute([sourceDimensions]),
        sizes: getSizesAttribute(sourceDimensions.width, layout),
      },
      sources: [],
    },
    width,
    height,
  };
  layoutDimensions.forEach(dimension => imageProps.images.sources.push({ src: '' }));
  switch (layout) {
    case `fixed`:
      imageProps.width = requestedDimensions.width;
      imageProps.height = requestedDimensions.height;
      break;

    case `fullWidth`:
      imageProps.width = 1;
      imageProps.height = 1 / sourceDimensions.aspectRatio;
      break;

    case `constrained`:
      imageProps.width = width || sourceDimensions.width || 1;
      imageProps.height = (imageProps.width || 1) / sourceDimensions.aspectRatio;
  }
  console.log(imageProps);
  return imageProps;
};
