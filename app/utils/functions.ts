export function includesTerm(word: string, searchTerm: string) {
  return word.toLowerCase().includes(searchTerm.toLowerCase());
}

export function isObjectValuesEmpty(obj: object){
  return Object.values(obj).every((value) => value.length);
}