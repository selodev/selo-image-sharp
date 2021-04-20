import { getSrcsetAttribute, getSizesAttribute } from './generate-attributes';
//import { transformImage } from './transform-image';
import { imageOptions, ImageOptions } from '..';
import { checkSetDefaultOptions } from './set-defeault-options';
import { getCalculatedDimensions } from '../dimensions/get-calculated-dimensions';
import { generateGetTransformations } from '../transformations/generate-get-transformations';
import { getImageProps } from './generate-responsive-images';
import { ImageProps } from '../models';
//import { processTransformations } from '../transformations/process-tranformations';
export const generateImageData = async (options: ImageOptions = imageOptions) => {
  options = await checkSetDefaultOptions(options);
  console.log('options', options);
  const {
    resizeOptions: { width, layout },
    inputOptions: { srcPath, srcFileName },
  } = options;
  const {
    sourceDimensions,
    requestedDimensions,
    layoutDimensions,
  } = await getCalculatedDimensions(options);

  const { imagesForProccessing } = generateGetTransformations(options, layoutDimensions);
  console.log(imagesForProccessing);
  //await processTransformations(imagesForProccessing);
  const [_, primaryFormat] = srcFileName.split('.');
  const imageSizes = getImageProps(options, layoutDimensions);
  const sizesAttribute = getSizesAttribute(sourceDimensions.width, layout);
  const imageProps: ImageProps = {
    layout,
    placeholder: undefined,
    //backgroundColor,
    images: {
      fallback: {
        src: (srcPath + '/' + srcFileName) as string,
        srcset: getSrcsetAttribute(imageSizes[primaryFormat]),
        sizes: sizesAttribute,
      },
      sources: [],
    },
    width: sourceDimensions.width,
    height: sourceDimensions.height,
  };
  console.log('pr', primaryFormat);
  for (let key in imageSizes) {
    if (key !== primaryFormat) {
      imageProps.images.sources.push({
        srcset: getSrcsetAttribute(imageSizes[key]),
        sizes: sizesAttribute,
        type: `image/${key}`,
      });
    }
  }
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
  console.log('imageProps', imageProps);
  return imageProps;
};
