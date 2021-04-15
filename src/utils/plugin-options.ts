// Plugin options are loaded onPreBootstrap in gatsby-node
const pluginDefaults = {
  base64Width: 20,
  forceBase64Format: ``, // valid formats: png,jpg,webp
  useMozJpeg: process.env.SELO_JPEG_ENCODER === `MOZJPEG`,
  stripMetadata: true,
  lazyImageGeneration: true,
  defaultQuality: 50,
  failOnError: true, // matches default of the sharp api constructor (https://sharp.pixelplumbing.com/api-constructor)
};
const generalArgs = {
  quality: 50,
  jpegQuality: null,
  pngQuality: null,
  webpQuality: null,
  jpegProgressive: true,
  pngCompressionLevel: 9,
  // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
  pngCompressionSpeed: 4,
  base64: true,
  grayscale: false,
  duotone: false,
  pathPrefix: ``,
  toFormat: ``,
  toFormatBase64: ``,
  sizeByPixelDensity: false,
  rotate: 0,
};
