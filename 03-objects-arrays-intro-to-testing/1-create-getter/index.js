/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
const arrPath = path.split('.');

if (!arrPath.length) return;
  return (obj) => {
    let result = obj;
    for (const arr of arrPath) {
      if (!result[arr]) return;
      result = result[arr];
    }
    return result;
  };
}
