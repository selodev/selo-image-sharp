import { SourceOptions } from '../models';
import { getCreateSourcePath } from './get-create-source-path';

export const fetchCreateRemoteImage = async (sourceOptions: SourceOptions) => {
  try {
    const { remoteUrl } = sourceOptions;
    console.log('sourceOptions', sourceOptions);
    const { absoluteImageSrc } = await getCreateSourcePath(sourceOptions);

    const response = await fetch(remoteUrl);
    const arrayBuffer = await response.arrayBuffer();
    console.log(JSON.stringify(arrayBuffer));
    if (response.status !== 200) {
      throw new Error('Looks like there was a problem. Status Code: ' + response.status);
    }
    const { default: fs } = await import('fs');
    // const writer = fs.createWriteStream();
    const buffer = Buffer.from(arrayBuffer);
    console.log(buffer);
    await new Promise(resolve => {
      fs.writeFile(absoluteImageSrc, buffer, 'binary', data => {
        resolve(data);
        console.log(data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
