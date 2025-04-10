const sounds = {
  buy: new Audio("assets/sounds/buy.wav"),
  toggle: new Audio("assets/sounds/toggle.wav"),
};

export function playSound(name) {
  const store = JSON.parse(localStorage.getItem("spaceDefenceStore")) || {};
  if (store.sound === false) return;

  const sound = sounds[name];
  if (sound) {
    sound.currentTime = 0; // Перезапуск звуку
    sound.play().catch((err) => console.warn("🎧 Помилка звуку:", err));
  }
}

// Перемикач звуку — дивись store.js
export function getSoundStatus() {
  const store = JSON.parse(localStorage.getItem("spaceDefenceStore")) || {};
  return store.sound !== false;
}
