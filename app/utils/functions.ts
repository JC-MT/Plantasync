export function includesTerm(word: string, searchTerm: string) {
  return word.toLowerCase().includes(searchTerm.toLowerCase());
}
