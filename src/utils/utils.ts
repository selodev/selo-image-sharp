export const sortNumeric = (a: number, b: number): number => a - b;

export const dedupeAndSortDensities = (values: Array<number>): Array<number> =>
  Array.from(new Set([1, ...values])).sort(sortNumeric);

/**
 * Joins 2 paths together and makes sure there aren't any duplicate seperators
 * @param parts the parts of the url to join. eg: ['http://google.com/', '/my-custom/path/']
 * @param separator The separator for the path, defaults to '/'
 * @returns {string} The combined path
 */
export function joinPaths(parts: string[], separator?: string): string {
  return parts
    .map(function (part) {
      return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
    })
    .join(separator || '/');
}
