import { SourceOptions } from '../models';

export const fetchWriteRemoteImage = async (sourceOptions: SourceOptions) => {
  try {
    const { resolve, join } = (await import('path')).default;

    const { srcPath, srcPathPrefix, srcFileName } = sourceOptions;
    const imageSrcPath = resolve(join(srcPathPrefix, ...srcPath.split('/')));
    const absoluteImageSrc = resolve(join(imageSrcPath, srcFileName));

    const { remoteUrl } = sourceOptions;
    const response = await fetch(remoteUrl);

    const arrayBuffer = await response.arrayBuffer();

    if (response.status !== 200) {
      throw new Error(
        `Looks like there was a problem with ${remoteUrl}. Status Code:${response.status}`,
      );
    }

    const { default: fs } = await import('fs');

    const buffer = Buffer.from(arrayBuffer);

    if (!fs.existsSync(imageSrcPath)) {
      fs.mkdirSync(imageSrcPath, { recursive: true });
    }

    if (fs.existsSync(absoluteImageSrc)) {
      //throw 'File exists ' + absoluteImageSrc;
    } else {
      return new Promise(resolve => {
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
