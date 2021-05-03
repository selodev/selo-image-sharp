import { dedupeAndSortDensities, sortNumeric } from '../utils';

export const getWidthsByDensitisOrBreakpoints = ({
  breakpoints,
  width,
  layout,
  pixelDensities,
  sourceMetadata,
}): number[] => {
  let widths: number[] = [];

  if (breakpoints?.length > 0 && (layout == 'constrained' || layout == 'fullWidth')) {
    widths = breakpoints.filter(breakpoint => breakpoint <= sourceMetadata.width);
    // If a larger breakpoint has been filtered-out, add the actual image width instead
    if (widths.length < breakpoints.length && !widths.includes(sourceMetadata.width)) {
      widths.push(sourceMetadata.width);
    }
  } else if (layout === 'fixed') {
    // Sort, dedupe and ensure there's a 1
    const densities = dedupeAndSortDensities(pixelDensities);
    widths = densities.map(density => Math.round(density * width));
    widths = widths.filter(size => size <= sourceMetadata.width);
  }
  // ensure that the size passed in is included in the final output
  if (!widths.includes(width)) {
    widths.push(width);
  }

  widths = widths.sort(sortNumeric);

  return widths;
};
