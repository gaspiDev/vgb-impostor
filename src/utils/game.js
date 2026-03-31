export function pickRandomCategory(categories) {
  return categories[Math.floor(Math.random() * categories.length)];
}

export function pickRandomWord(category) {
  return category.words[Math.floor(Math.random() * category.words.length)];
}

export function pickImpostorIndices(playerCount) {
  const count = playerCount >= 6 ? 2 : 1;
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * playerCount));
  }
  return [...indices];
}
