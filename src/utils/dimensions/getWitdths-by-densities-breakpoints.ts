import { dedupeAndSortDensities, sortNumeric } from '../utils';

export const getWidthsByDensitisOrBreakpoints = ({
  breakpoints,
  width,
  layout,
  pixelDensities,
  srcMetadata,
  allowOversizedDimensions,
}) => {
  let widths: number[] = [];

  if (breakpoints?.length > 0 && layout == 'fullWidth') {
    if (allowOversizedDimensions) {
      widths = breakpoints;
    } else {
      widths = breakpoints.filter(breakpoint => breakpoint <= srcMetadata.width);
    }
    // If a larger breakpoint has been filtered-out, add the actual image width instead
    if (widths.length < breakpoints.length && !widths.includes(srcMetadata.width)) {
      widths.push(srcMetadata.width);
    }
  } else if (layout == 'fixed') {
    // Sort, dedupe and ensure there's a 1
    const densities = dedupeAndSortDensities(pixelDensities);
    widths = densities.map(density => Math.round(density * width));
    widths = widths.filter(size => size <= srcMetadata.width);
  }

  widths = widths.sort(sortNumeric);
  return widths;
};
