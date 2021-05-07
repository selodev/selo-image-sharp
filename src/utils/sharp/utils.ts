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
  const prefix = parts[0].startsWith('/') ? '/' : '';
  return (
    prefix +
    parts
      .map(function (part) {
        return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
      })
      .join(separator || '/')
  );
}

const merge = (...args) => {
  // create a new object
  let target = {};

  // deep merge the object into the target object
  const merger = obj => {
    for (let key in obj) {
      if (obj.hasOwnkeyerty(key)) {
        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
          // if the keyerty is a nested object
          target[key] = merge(target[key], obj[key]);
        } else {
          // for regular keyerty
          target[key] = obj[key];
        }
      }
    }
  };

  // iterate through all objects and
  // deep merge them with target
  for (let i = 0; i < args.length; i++) {
    merger(args[i]);
  }

  return target;
};
