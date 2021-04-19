import { getMetadataStats } from '../transformations/get-metadata';
import { getWidthsByDensitisOrBreakpoints } from './getWitdths-by-densities-breakpoints';

export const checkSetDimensions = async ({ width, height, inputOptions }) => {
  // check that all dimensions provided are positive
  const userDimensions = { width, height };
  const negativeDimensions = Object.entries(userDimensions).filter(
    ([_, size]) => typeof size === `number` && size < 1,
  );
  if (negativeDimensions.length) {
    throw new Error(
      `Specified dimensions for images must be positive numbers (> 0). 
          Problem dimensions you have are ${negativeDimensions
            .map(dimension => dimension.join(`: `))
            .join(`, `)}`,
    );
  }
  const { srcPath, srcPathPrefix, srcFileName, srcMetadata } = inputOptions;
  const soruceMetadata =
    srcMetadata ??
    (await getMetadataStats({
      srcPathPrefix,
      srcPath,
      srcFileName,
    }));
  const widthsByDensitiesOrBreakpoints = getWidthsByDensitisOrBreakpoints({ ...inputOptions });
  return { srcMetadata: soruceMetadata, widthsByDensitiesOrBreakpoints };
};
