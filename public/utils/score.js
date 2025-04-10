const HIGH_SCORE_KEY = "highscore";

// 🧮 Повертає рекорд з localStorage
export function getHighScore() {
  return parseInt(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
}

// 💾 Зберігає новий рекорд, якщо вищий
export function updateScore(newScore) {
  const highScore = getHighScore();
  if (newScore > highScore) {
    localStorage.setItem(HIGH_SCORE_KEY, newScore);
    console.log("🏆 Новий рекорд:", newScore);
  }
}

// 🎯 Відображення в UI
export function updateHighScoreUI() {
  const span = document.getElementById("highscore");
  if (span) span.textContent = getHighScore();
}
