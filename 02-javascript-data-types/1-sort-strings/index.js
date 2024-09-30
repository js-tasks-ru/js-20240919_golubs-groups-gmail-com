/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
const locales = ["ru", "en"];
const options = { sensitivity: "variant", caseFirst: "upper" };
const collator = new Intl.Collator(locales, options);
const sortDesc = (a, b) => collator.compare(b, a);
const sortAsc = (a, b) => collator.compare(a, b);

export function sortStrings(arr, param = 'asc') {
    const sortedArr = [...arr];
if (param === 'asc'){
    return sortedArr.sort(sortAsc);}
else{
    return sortedArr.sort(sortDesc);
}
}
