import { SourceOptions } from '../models';

export const fetchWriteRemoteImage = async (sourceOptions: SourceOptions) => {
  try {
    const { resolve, join } = (await import('path')).default;

    const { srcPath, srcPathPrefix, srcFileName } = sourceOptions;
    const imageSrcPath = resolve(join(srcPathPrefix, ...srcPath.split('/')));
    const absoluteImageSrc = resolve(join(imageSrcPath, srcFileName));

    const { default: fs } = await import('fs');

    if (!fs.existsSync(imageSrcPath)) {
      fs.mkdirSync(imageSrcPath, { recursive: true });
    }

    if (!fs.existsSync(absoluteImageSrc)) {
      const { remoteUrl } = sourceOptions;
      const response = await fetch(remoteUrl);

      const arrayBuffer = await response.arrayBuffer();

      if (response.status !== 200) {
        throw new Error(
          `Looks like there was a problem with ${remoteUrl}. Status Code:${response.status}`,
        );
      }
      const buffer = Buffer.from(arrayBuffer);

      await new Promise(resolve => {
        fs.writeFile(absoluteImageSrc, buffer, 'binary', data => {
          //console.log(`Fetched ${remoteUrl}and saved it at ${imageSrcPath} `);
          resolve(data);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};
