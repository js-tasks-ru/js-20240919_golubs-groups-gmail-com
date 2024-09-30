/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    const result = items.reduce((arr_new, arr) => {
        if (arr_new.includes(arr)) {
          return arr_new; 
        }
        return [...arr_new, arr]; 
      }, []);
}
