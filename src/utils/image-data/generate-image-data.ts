import { getSrcsetAttribute, getSizesAttribute } from './generate-attributes';
import { imageOptions, ImageOptions } from '..';
import { checkSetDefaultOptions } from './set-defeault-options';
import { getCalculatedDimensions } from '../dimensions/get-calculated-dimensions';
//import { generateGetTransformations } from '../transformations/generate-get-transformations';
import { getImageProps } from './generate-responsive-images';
import { ImageProps } from '../models';
import { Build } from '@stencil/core';
import { fetchCreateRemoteImage } from '../remote/fetch-create-remote-image';

export const generateImageData = async (options: ImageOptions = imageOptions) => {
  options = await checkSetDefaultOptions(options);

  const {
    resizeOptions: { width, layout },
    sourceOptions,
    sourceOptions: { remoteUrl, srcPath, srcFileName },
  } = options;

  const {
    sourceDimensions,
    requestedDimensions,
    layoutDimensions,
  } = await getCalculatedDimensions(options);

  if (!Build.isBrowser) {
    if (remoteUrl) {
      await fetchCreateRemoteImage(sourceOptions);
    }
    /*     const { imagesForProccessing } = generateGetTransformations(
      options,
      layoutDimensions,
    );
    const { processTransformations } = await import(
      '../transformations/process-tranformations'
    );
    await processTransformations(imagesForProccessing); */
  }

  const [_, primaryFormat] = srcFileName.split('.');
  console.log(primaryFormat);
  const imageSizes = getImageProps(options, layoutDimensions);
  const sizesAttribute = getSizesAttribute(requestedDimensions.width, layout);
  console.log(imageSizes, imageSizes[primaryFormat]);
  const imageProps: ImageProps = {
    layout,
    placeholder: undefined,
    //backgroundColor,
    images: {
      fallback: {
        src: (srcPath + '/' + srcFileName) as string,
        srcset: getSrcsetAttribute(imageSizes[primaryFormat]),
        sizes: sizesAttribute,
        type: `image/${primaryFormat}`,
      },
      sources: [],
    },
    width: 0,
    height: 0,
  };

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
      imageProps.height = 1 / sourceDimensions.aspectRatio;
  }

  return imageProps;
};
