import { dedupeAndSortDensities, sortNumeric } from './utils';

export const getSizesByBreakpoints = ({
  breakpoints,
  width,
  layout,
  pixelDensities,
  sourceMetadata,
}) => {
  let sizes;
  // Sort, dedupe and ensure there's a 1
  const densities = dedupeAndSortDensities(pixelDensities);

  if (breakpoints?.length > 0) {
    sizes = breakpoints.filter(
      breakpoint => breakpoint <= sourceMetadata.width,
    );

    // If a larger breakpoint has been filtered-out, add the actual image width instead
    if (
      sizes.length < breakpoints.length &&
      !sizes.includes(sourceMetadata.width)
    ) {
      sizes.push(sourceMetadata.width);
    }
  } else {
    sizes = densities.map(density => Math.round(density * width));
    sizes = sizes.filter(size => size <= sourceMetadata.width);
  }

  // ensure that the size passed in is included in the final output
  if (layout === `constrained` && !sizes.includes(width)) {
    sizes.push(width);
  }
  sizes = sizes.sort(sortNumeric);
  return sizes;
};
