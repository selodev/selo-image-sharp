import { getMetadata } from './ex/get-metadata';
import { ISharpImageArgs } from './models/models';

export const generateImageData = async (args: ISharpImageArgs) => {
  const { src, formats } = args;

  const sourceMetadata = await getMetadata(src);
};
