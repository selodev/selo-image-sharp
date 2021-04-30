import { ImageOptions } from '../models';

export const checkDefaultOptions = async (options: ImageOptions) => {
  const {
    resizeOptions: { width, height },
  } = options;
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
};
