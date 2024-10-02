/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  const entries = Object.entries(obj);
  const result = {}
 for (const [key, value] of entries) {
   result[value] = pair[key];
 }
  return result;
}
