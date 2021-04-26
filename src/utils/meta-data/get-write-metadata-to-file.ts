import { ImageOptions } from '..';
import { SourceMetadata } from '../models';
import { getMetadata } from './get-metadata';

export const getWriteMetadataToFile = async (
  options: ImageOptions,
): Promise<SourceMetadata> => {
  try {
    const { default: fs } = await import('fs');
    const { resolve, join } = (await import('path')).default;

    const {
      sourceOptions: { srcPath, srcPathPrefix, srcFileName, sourceMetadataDigestDir },
    } = options;

    const [sourceMetadataFileName] = srcFileName.split('.');

    const sourceMetadataPath = resolve(
      join(srcPathPrefix, ...srcPath.split('/'), sourceMetadataDigestDir),
    );

    const absoluteSourceMetadataFilePath = resolve(
      join(sourceMetadataPath, sourceMetadataFileName + '.json'),
    );

    if (!fs.existsSync(sourceMetadataPath)) {
      fs.mkdirSync(sourceMetadataPath, { recursive: true });
    }

    let sourceMetadata: SourceMetadata;

    if (fs.existsSync(absoluteSourceMetadataFilePath)) {
      console.log('File exists ' + absoluteSourceMetadataFilePath);
      const rawData = fs.readFileSync(absoluteSourceMetadataFilePath, 'utf8');
      sourceMetadata = JSON.parse(rawData);
    } else {
      sourceMetadata = await getMetadata({
        srcPath,
        srcPathPrefix,
        srcFileName,
      });
      fs.writeFileSync(absoluteSourceMetadataFilePath, JSON.stringify(sourceMetadata));
    }

    return sourceMetadata;
  } catch (error) {
    console.warn(error);
  }
};
