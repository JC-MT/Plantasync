export function includesTerm(word: string, searchTerm: string) {
  return word.toLowerCase().includes(searchTerm.toLowerCase());
}

export function capitalizeFirstLetters(words: string) {
  return words.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
