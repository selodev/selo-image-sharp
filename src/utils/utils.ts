export const sortNumeric = (a: number, b: number): number => a - b;

export const dedupeAndSortDensities = (values: Array<number>): Array<number> =>
  Array.from(new Set([1, ...values])).sort(sortNumeric);
