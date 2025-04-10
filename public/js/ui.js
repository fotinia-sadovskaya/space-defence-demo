import { isUpgradeOwned } from "./store.js";
import { getSoundStatus } from "../utils/sound.js";

// 🧠 Оновлення HUD (викликається при старті або після htmx)
export function updateHUD() {
  updateWeaponUI();
  updateHighScoreUI();
  updateScoreUI(0);
  updatePlayersOnline(1); // за замовчуванням 1
}

// 🔫 Назва зброї
export function updateWeaponUI(type = "normal") {
  const nameMap = {
    normal: "🟡 Звичайна",
    strong: "🔴 Сильна",
    laser: "🔵 Лазер",
  };

  const span = document.getElementById("weaponType");
  if (span) span.textContent = nameMap[type] || "🟡 Звичайна";
}

// 💎 Очки
export function updateScoreUI(score) {
  const span = document.getElementById("score");
  if (span) span.textContent = score;
}

// 🏆 Рекорд
export function updateHighScoreUI() {
  const hs = localStorage.getItem("highscore") || 0;
  const span = document.getElementById("highscore");
  if (span) span.textContent = hs;
}

// 👥 Онлайн
export function updatePlayersOnline(n = 1) {
  const span = document.getElementById("playersOnline");
  if (span) span.textContent = n;
}

// 🛒 Стан кнопок магазину
export function updateStoreUI() {
  const buttons = document.querySelectorAll(".store__btn");
  buttons.forEach((btn) => {
    const upgrade = btn.dataset.upgrade;
    if (upgrade && isUpgradeOwned(upgrade)) {
      btn.classList.add("store__btn--owned");
      btn.disabled = true;
    }
  });

  // 🔇 Стан кнопки звуку
  const soundBtn = document.getElementById("soundToggleBtn");
  if (soundBtn) {
    const on = getSoundStatus();
    soundBtn.textContent = on ? "🔊 Звук УВІМКНЕНО" : "🔇 Звук ВИМКНЕНО";
  }
}
