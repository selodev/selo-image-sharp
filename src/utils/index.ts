import { getSizes, getSrcSet } from './generate-attributes';
import { generateImageData } from './generate-image-data';
import { ISharpImageArgs } from './models';
import { prepareImageInformation } from './prepare-image-metadata';

export default async ({
  src,
  srcPath,
  srcPathPrefix,
  inputFile,
  destPath,
  destPathPrefix,
  digestDirPrefix,
  outputFile,
  layout = 'constrained',
  placeholder = `dominantColor`,
  quality,
  aspectRatio,
  width,
  height,
  fit,
  format,
  formats,
  breakpoints,
  sizes,
  backgroundColor,
}: ISharpImageArgs) => {
  ({
    file: inputFile,
    srcPath,
    formattedFileName: outputFile,
  } = prepareImageInformation({
    src,
    width,
    height,
    format,
  }));

  const { image, transforms } = await generateImageData({
    srcPath,
    srcPathPrefix,
    inputFile,
    destPath,
    destPathPrefix,
    digestDirPrefix,
    outputFile,
    layout,
    placeholder,
    quality,
    aspectRatio,
    width,
    height,
    fit,
    formats,
    breakpoints,
    backgroundColor,
  });

  const srcSet = getSrcSet(transforms);

  sizes = sizes || getSizes(image.unscaledWidth, layout);

  const primaryIndex =
    layout === `fullWidth`
      ? image.sizes.length - 1 // The largest image
      : image.sizes.findIndex(size => size === image.unscaledWidth);

  if (primaryIndex === -1) {
    console.error(
      `No image of the specified size found. Images may not have been processed correctly.`,
    );
    return undefined;
  }

  const primaryImage = transforms[primaryIndex];

  if (!transforms.length) {
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
  transforms.forEach(transform => {
    imageProps.images.sources.push({
      type: 'image/' + format,
      sizes: getSizes(transform.width, transform.layout),
      srcSet: getSrcSet([transform]),
    });
  });
  primaryImage.aspectRatio = primaryImage.aspectRatio || 1;

  switch (layout) {
    case `fixed`:
      imageProps.width = image.presentationWidth;
      imageProps.height = image.presentationHeight;
      break;

    case `fullWidth`:
      imageProps.width = 1;
      imageProps.height = 1 / primaryImage.aspectRatio;
      break;

    case `constrained`:
      imageProps.width = width || primaryImage.width || 1;
      imageProps.height = (imageProps.width || 1) / primaryImage.aspectRatio;
  }
  return imageProps;
};
