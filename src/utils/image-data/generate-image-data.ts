import { getSrcsetAttribute, getSizesAttribute } from './generate-attributes';
import { ImageOptions, joinPaths } from '..';
import { checkSetDefaultOptions } from './set-defeault-options';
import { getCalculatedDimensions } from '../dimensions/get-calculated-dimensions';
import { generateGetTransformations } from '../transformations/generate-get-transformations';
import { generateImageSources } from './get-image-sources';
import { ImageProps, ImageSources } from '../models';
import { Build } from '@stencil/core';
import { fetchCreateRemoteImage } from '../remote/fetch-create-remote-image';

export const generateImageData = async (options: ImageOptions) => {
  const {
    sourceOptions,
    sourceOptions: { remoteUrl },
  } = options;

  if (remoteUrl && !Build.isBrowser) {
    await fetchCreateRemoteImage(sourceOptions);
  }

  options = await checkSetDefaultOptions(options);
  const {
    resizeOptions: { width, layout },
    sourceOptions: { srcPath, srcFileName },
  } = options;

  const {
    sourceDimensions,
    requestedDimensions,
    layoutDimensions,
  } = await getCalculatedDimensions(options);

  if (!Build.isBrowser) {
    const { imagesForProccessing } = generateGetTransformations(
      options,
      layoutDimensions,
    );
    const { processTransformations } = await import(
      '../transformations/process-tranformations'
    );
    await processTransformations(imagesForProccessing);
  }

  const [_, primaryFormat] = srcFileName.split('.');
  const imageSources: ImageSources = generateImageSources(options, layoutDimensions);
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
      },
      sources: [],
    },
    width: 0,
    height: 0,
  };

  for (let key in imageSources) {
    if (key !== primaryFormat) {
      const imageSourcesByFormat = await Promise.all(imageSources[key]);
      console.log(imageSourcesByFormat)
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
