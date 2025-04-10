const sounds = {
  buy: new Audio("assets/sounds/buy.wav"),
  toggle: new Audio("assets/sounds/toggle.wav"),
};
export function playSound(name = "buy") {
  const sound = sounds[name];
  if (sound) {
    sound.volume = 0.5;
    sound.play().catch((err) => console.warn("🔇 Звук не відтворено:", err));
  }
}
