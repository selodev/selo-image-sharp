export function getImageFitType(sharp, fit) {
  const imageFitType = {
    COVER: { value: sharp.fit.cover },
    CONTAIN: { value: sharp.fit.contain },
    FILL: { value: sharp.fit.fill },
    INSIDE: { value: sharp.fit.inside },
    OUTSIDE: { value: sharp.fit.outside },
  };
  return imageFitType[fit];
}

export function getImageCropFocusType(sharp, position) {
  const imageCropFocusType = {
    CENTER: { value: sharp.gravity.center },
    NORTH: { value: sharp.gravity.north },
    NORTHEAST: { value: sharp.gravity.northeast },
    EAST: { value: sharp.gravity.east },
    SOUTHEAST: { value: sharp.gravity.southeast },
    SOUTH: { value: sharp.gravity.south },
    SOUTHWEST: { value: sharp.gravity.southwest },
    WEST: { value: sharp.gravity.west },
    NORTHWEST: { value: sharp.gravity.northwest },
    ENTROPY: { value: sharp.strategy.entropy },
    ATTENTION: { value: sharp.strategy.attention },
  };
  return imageCropFocusType[position];
}
