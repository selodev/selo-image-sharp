import { ImageOptions, joinPaths } from '..';
import { ImageProps, ImageSources } from '../models';
import { getSizesAttribute, getSrcsetAttribute } from './generate-attributes';

export const generateImageProps = async (
  options: ImageOptions,
  calculatedDimensions,
  imageSources: ImageSources,
) => {
  const { sourceDimensions, requestedDimensions } = calculatedDimensions;
  const {
    resizeOptions: { width, layout },
    sourceOptions: { srcPath, srcFileName, sourceMetadata },
  } = options;

  const [_, primaryFormat] = srcFileName.split('.');

  const sizesAttribute = getSizesAttribute(requestedDimensions.width, layout);

  const imageProps: ImageProps = {
    layout,
    placeholder: undefined,
    //backgroundColor,
    images: {
      fallback: {
        src: joinPaths([srcPath, srcFileName], '/'),
        srcset: getSrcsetAttribute(await Promise.all(imageSources[primaryFormat])),
        sizes: sizesAttribute,
        type: `image/${primaryFormat}`,
        sourceMetadata,
      },
      sources: [],
    },
    width: 0,
    height: 0,
  };

  for (let key in imageSources) {
    if (key !== primaryFormat) {
      const imageSourcesByFormat = await Promise.all(imageSources[key]);
      imageProps.images.sources.push({
        srcset: getSrcsetAttribute(imageSourcesByFormat),
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
      imageProps.height = 1 / sourceDimensions.aspectRatio;
  }

  return imageProps;
};
