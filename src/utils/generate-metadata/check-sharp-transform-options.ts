export const checkSharpTransformOptions = (sharpTransformOptions, file) => {
  const {
    fit = `cover`,
    cropFocus: "sharp.strategy.intention",
    duotone: { heighlight, shadow },
  } = sharpTransformOptions;

  heighlight ??
    shadow ??
    console.warn(
      `Invalid duotone option specified for ${file.absolutePath}, 
          ignoring. Please pass an object to duotone with the keys 
          "highlight" and "shadow" set to the corresponding hex values you want to use.`,
    );
  return fit;
};
