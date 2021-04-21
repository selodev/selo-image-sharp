import { ImageOptions } from '..';

export const getCreateSourceDestinationPaths = async ({
  sourceOptions,
  destinationOptions,
  resizeOptions,
}: ImageOptions): Promise<{ absoluteImageSrc: string; absoluteImageDest: string }> => {
  const { default: fs } = await import('fs');
  const { resolve, join } = (await import('path')).default;
  
  const { srcPath, srcPathPrefix, srcFileName } = sourceOptions;

  const absoluteImageSrc = resolve(
    join(srcPathPrefix, ...srcPath.split('/'), `${srcFileName}`),
  );
  
  const { destPath, destPathPrefix, digestDirPrefix, destFileName } = destinationOptions;
  let { format } = resizeOptions;
  
  const imageDestPath = resolve(
    join(destPathPrefix, ...destPath.split('/'), digestDirPrefix, format),
  );
  const absoluteImageDest = resolve(join(imageDestPath, destFileName));
  
  if (fs.existsSync(absoluteImageDest)) {
    throw new Error('File exists ' + absoluteImageDest);
  }
  if (!fs.existsSync(imageDestPath)) {
    fs.mkdirSync(imageDestPath, { recursive: true });
  }
  
  return { absoluteImageSrc, absoluteImageDest };
};
