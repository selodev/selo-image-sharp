import { ImageOptions } from '..';
import { ImageProps } from '../models';

export const writeImagePropsToFile = async (
  options: ImageOptions,
  imageProps: ImageProps,
): Promise<ImageProps> => {
  try {
    const { default: fs } = await import('fs');
    const { resolve, join } = (await import('path')).default;

    const {
      sourceOptions: { srcPath, srcPathPrefix, srcFileName, imagePropsDigestDir },
    } = options;

    const [imagePropsFileName] = srcFileName.split('.');

    const imagePropsPath = resolve(
      join(srcPathPrefix, ...srcPath.split('/'), imagePropsDigestDir),
    );

    const absoluteImagePropsFilePath = resolve(
      join(imagePropsPath, imagePropsFileName + '.json'),
    );

    if (!fs.existsSync(imagePropsPath)) {
      fs.mkdirSync(imagePropsPath, { recursive: true });
    }

    if (fs.existsSync(absoluteImagePropsFilePath)) {
      //console.log('File exists ' + absoluteimagePropsFilePath);
      const rawData = fs.readFileSync(absoluteImagePropsFilePath, 'utf8');
      imageProps = JSON.parse(rawData);
    } else {
      fs.writeFileSync(absoluteImagePropsFilePath, JSON.stringify(imageProps));
    }
    console.log('wr')

    return imageProps;
  } catch (error) {
    console.warn(error);
  }
};
