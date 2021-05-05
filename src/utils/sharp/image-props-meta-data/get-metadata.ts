import { Sharp } from 'sharp';
import { SourceMetadata } from '../models';

export const getMetadata = async ({
  srcPath,
  srcPathPrefix,
  srcFileName,
}): Promise<SourceMetadata> => {
  const { resolve, join } = (await import('path')).default;
  const imageSrcPath = resolve(
    join(srcPathPrefix, ...srcPath.split('/'), `${srcFileName}`),
  );
  const { default: sharp } = await import('sharp');
  const pipeline: Sharp = sharp(imageSrcPath);
  const { width, height, format } = await pipeline.metadata();
  return { width, height, format };
};
