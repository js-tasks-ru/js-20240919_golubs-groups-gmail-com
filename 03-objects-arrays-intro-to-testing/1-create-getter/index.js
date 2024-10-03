/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {

  return function(obj) {
    const arrPath = path.split('.');
    let result = obj;
    for (const arr of arrPath) {
      if(result.hasOwnProperty(arr)){
         result = result[arr];
      }
      else
      {
        return;
      }
    }
    return result;
  };
}
