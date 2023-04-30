module.exports = function levenshtein (string1, string2) {
  const m = string1.length
  const n = string2.length

  const distances = []
  for (let i = 0; i <= m; i++) {
    distances[i] = []
    distances[i][0] = i
  }
  for (let j = 0; j <= n; j++) {
    distances[0][j] = j
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = string1[i - 1] === string2[j - 1] ? 0 : 1
      distances[i][j] = Math.min(
        distances[i - 1][j] + 1,
        distances[i][j - 1] + 1,
        distances[i - 1][j - 1] + cost
      )
    }
  }

  return distances[m][n]
}
