import { SUPPORTED_FORMATS } from './constants';
import { ISharpImageArgs } from './models';
import { calculateImageSizes } from './calculateImageSizes';
import { resizeFormatImageToFile } from './ex/resize-format-image-to-file';
import { getMetadataStats } from './ex/get-metadata';
import { getDimensionsAndAspectRatio } from './getDimensionsAndAspectRatio';
export const generateImageData = async (args: ISharpImageArgs) => {
  const {
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
    backgroundColor,
    breakpoints,
  } = args;
  let { formats } = args;
  formats = new Set(formats) ?? SUPPORTED_FORMATS;
  const sourceMetadata = await getMetadataStats(
    srcPathPrefix + srcPath + inputFile,
  );
  const image: {
    sizes: Array<number>;
    presentationWidth: number;
    presentationHeight: number;
    aspectRatio: number;
    unscaledWidth: number;
  } = calculateImageSizes({
    inputFile,
    width,
    height,
    layout,
    sourceMetadata,
    breakpoints,
  });

  const transforms = Array.from(formats)
    .map(format =>
      image.sizes.map(size => ({
        src: destPath + destPathPrefix + outputFile,
        srcPath,
        srcPathPrefix,
        inputFile,
        destPath,
        destPathPrefix,
        digestDirPrefix,
        outputFile,
        width: Math.round(size),
        height: Math.round(size / image.aspectRatio),
        aspectRatio: getDimensionsAndAspectRatio({
          width: Math.round(size),
          height: size / image.aspectRatio,
        }).aspectRatio,
        format,
        fit,
        quality,
        layout,
        [format + 'Options']: format + 'Options',
      })),
    )
    .reduce(
      (previosValue, currentValue) => previosValue.concat(currentValue),
      [],
    );

  const prorcessTransforms = transforms.map((transform: ISharpImageArgs) =>
    resizeFormatImageToFile(transform),
  );
  await Promise.all(prorcessTransforms);

  return { image, transforms };
};
