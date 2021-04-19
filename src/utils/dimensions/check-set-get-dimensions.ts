import { getMetadataStats } from '../transformations/get-metadata-stats';

export const checkSetGetDimensions = async ({ width, height, inputOptions }) => {
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
  const { srcPath, srcPathPrefix, srcFileName } = inputOptions;
  let { sourceMetadata } = inputOptions;
  sourceMetadata ??= await getMetadataStats({
    srcPathPrefix,
    srcPath,
    srcFileName,
  });
  return { sourceMetadata };
};
