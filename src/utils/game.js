export function pickRandomCategory(categories) {
  return categories[Math.floor(Math.random() * categories.length)];
}

export function pickRandomWord(category) {
  return category.words[Math.floor(Math.random() * category.words.length)];
}

export function pickImpostorIndex(playerCount) {
  return Math.floor(Math.random() * playerCount);
}
