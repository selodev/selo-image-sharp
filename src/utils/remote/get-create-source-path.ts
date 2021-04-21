import { SourceOptions } from '../models';

export const getCreateSourcePath = async (
  sourceOptions: SourceOptions,
): Promise<{ absoluteImageSrc: string }> => {
  const { default: fs } = await import('fs');
  const { resolve, join } = (await import('path')).default;

  const { srcPath, srcPathPrefix, srcFileName } = sourceOptions;
  const imageSrcPath = resolve(join(srcPathPrefix, ...srcPath.split('/')));
  const absoluteImageSrc = resolve(join(imageSrcPath, srcFileName));

  if (fs.existsSync(absoluteImageSrc)) {
    throw new Error('File exists ' + absoluteImageSrc);
  }
  if (!fs.existsSync(imageSrcPath)) {
    fs.mkdirSync(imageSrcPath, { recursive: true });
  }

  return { absoluteImageSrc };
};
