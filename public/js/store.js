import { updateStoreUI } from "./ui.js";
import { showToast } from "../utils/notify.js";
import { playSound, toggleSound, getSoundStatus } from "../utils/sound.js";

// 💾 Ключ для localStorage
const STORE_KEY = "spaceDefenceStore";

// 📦 Структура сховища
function getStore() {
  const saved = localStorage.getItem(STORE_KEY);
  return saved ? JSON.parse(saved) : { upgrades: [], sound: true };
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

// 🧠 Чи вже куплено?
export function isUpgradeOwned(name) {
  const store = getStore();
  return store.upgrades.includes(name);
}

// 🛍 Покупка апгрейду
export function buyUpgrade(name) {
  const store = getStore();
  if (!store.upgrades.includes(name)) {
    store.upgrades.push(name);
    saveStore(store);
    playSound("buy");
    showToast(`✅ Куплено: ${name}`);
  } else {
    showToast(`❗ Вже куплено: ${name}`);
  }
  updateStoreUI();
}

// 🔊 Звук перемикання
window.toggleSound = function () {
  const store = getStore();
  store.sound = !store.sound;
  saveStore(store);
  const status = store.sound;
  playSound("toggle");
  showToast(status ? "🔊 Звук увімкнено" : "🔇 Звук вимкнено");
  updateStoreUI();
};

// 🎧 Публічний доступ до стану звуку
export function isSoundEnabled() {
  return getStore().sound;
}
