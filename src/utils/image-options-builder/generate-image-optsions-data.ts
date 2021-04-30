import { Build } from '@stencil/core';
import { ImageOptions } from '../sharp';

export const generateImageDataOptions = async (options: ImageOptions): Promise<any> => {
  let { sourceOptions, destinationOptions } = options;

  if (Build.isBrowser) {
    let { srcPath,src } = sourceOptions;
    let { destPath, imagePropsDigestDir } = destinationOptions;
    const file = src.split('/').pop();
    const [destFileName] = file.split('.');
    destPath = destPath + src.replace(srcPath, '').replace(`${file}`, '');

    return {
      destinationOptions: {
        destPath,
        destFileName,
        imagePropsDigestDir,
      },
    };
  } else if (Build.isServer) {
    const { sharpImageOptionsBuilder } = await import('./sharp-image-options-builder');
    const sharpOptions: any = await sharpImageOptionsBuilder(options);
    const { generateImageData } = await import('../sharp');
    await generateImageData(sharpOptions);
  }
};
