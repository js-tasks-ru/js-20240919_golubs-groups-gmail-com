/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
let ch = string.length;
let result = '';
let s= '';
for (let i = 0; i < string.length; i++) {
    s = string[i] +  (string[i] === s[0] ? s : '')
    if (s.length >size) continue
    result += string[i]
}
return result;
}
