import { getSrcsetAttribute, getSizesAttribute } from './generate-attributes';
//import { transformImage } from './transform-image';
import { imageOptions, ImageOptions } from '..';
import { checkSetDefaultOptions } from './set-defeault-options';
import { getCalculatedDimensions } from '../dimensions/get-calculated-dimensions';
import { generateGetTransformations } from '../transformations/generate-get-transformations';
export const generateImageData = async (options: ImageOptions = imageOptions) => {
  options = await checkSetDefaultOptions(options);
  console.log('options', options);
  const {
    resizeOptions: { width, height, layout },
    inputOptions: { srcPath, srcFileName },
  } = options;
  const {
    sourceDimensions,
    requestedDimensions,
    layoutDimensions,
  } = await getCalculatedDimensions(options);

  const { transformations } = generateGetTransformations(options, layoutDimensions);
  /// const
  console.log('sourceImage', transformations);
  const layoutImages = transformations.map(transformation => {
    const trans = transformation.map(trans => {
      const {
        outputOptions: { destPath, digestDirPrefix, destFileName },
        resizeOptions: { width, format, layout },
      } = trans;
      return {
        src: `${destPath}/${digestDirPrefix}/${destFileName}`,
        width,
        type: `image/${format}`,
        layout,
      };
    });
    
    return trans;
  });
  layoutImages.map(img=>)
  const imageProps = {
    layout,
    placeholder: undefined,
    //backgroundColor,
    images: {
      fallback: {
        src: srcPath + '/' + srcFileName,
        srcset: getSrcsetAttribute(
          layoutImages.reduce(
            (previosValue, currentValue) => previosValue.concat(currentValue),
            [],
          ),
        ),
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
  console.log('imageProps', imageProps);
  return imageProps;
};
