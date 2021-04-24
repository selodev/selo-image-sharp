import { ImageOptions } from '..';

export const getCreateSourceDestinationPaths = async ({
  sourceOptions,
  destinationOptions,
  resizeOptions,
}: ImageOptions): Promise<{ absoluteImageSrc: string; absoluteImageDest: string }> => {
  const { resolve, join } = (await import('path')).default;

  const { srcPath, srcPathPrefix, srcFileName } = sourceOptions;
  const absoluteImageSrc = resolve(
    join(srcPathPrefix, ...srcPath.split('/'), srcFileName),
  );

  const { destPath, destPathPrefix, digestDirPrefix, destFileName } = destinationOptions;

  let { format } = resizeOptions;

  const imageDestPath = resolve(
    join(destPathPrefix, ...destPath.split('/'), digestDirPrefix, format),
  );
  const absoluteImageDest = resolve(join(imageDestPath, destFileName));

  const { default: fs } = await import('fs');

  if (fs.existsSync(absoluteImageDest)) {
    throw 'File exists ' + absoluteImageDest;
  }

  if (!fs.existsSync(imageDestPath)) {
    fs.mkdirSync(imageDestPath, { recursive: true });
  }

  return { absoluteImageSrc, absoluteImageDest };
};
