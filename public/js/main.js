import Player from "./player.js";
import Enemy from "./enemy.js";
import Bullet from "./bullet.js";
import Asteroid from "./asteroid.js";
import { updateScore, updateHighScoreUI } from "./score.js";
import { showToast } from "../utils/notify.js";
import { playSound } from "../utils/sound.js";
import { isUpgradeOwned } from "./store.js";

// 🎮 Основні масиви та canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bullets = [];
const enemies = [];
const asteroids = [];

let currentWeapon = "normal";
const weaponTypes = ["normal", "strong", "laser"];
let weaponIndex = 0;

let currentScore = 0;

// 🚀 Створюємо гравця
const player = new Player(canvas, bullets);

// 🧨 Спавн ворогів
function spawnEnemy() {
  const x = Math.random() * (canvas.width - 50);
  const enemy = new Enemy(canvas, x, 0);
  enemies.push(enemy);
}
setInterval(spawnEnemy, 2000);

// 🪨 Спавн астероїдів
function spawnAsteroid() {
  const x = Math.random() * (canvas.width - 60);
  const speed = 1 + Math.random() * 2;
  asteroids.push(new Asteroid(canvas, x, -60, speed));
}
setInterval(spawnAsteroid, 3500);

// 🎯 Головний ігровий цикл
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Кулі
  bullets.forEach((bullet, index) => {
    bullet.move();
    bullet.draw();
    if (bullet.isOutOfScreen()) bullets.splice(index, 1);
  });

  // Вороги
  enemies.forEach((enemy, index) => {
    enemy.move();
    enemy.draw();
    if (enemy.y > canvas.height) enemies.splice(index, 1);
  });

  // Астероїди
  asteroids.forEach((asteroid, index) => {
    asteroid.move();
    asteroid.draw();
    if (asteroid.y > canvas.height) asteroids.splice(index, 1);
  });

  // Перевірка зіткнень
  checkCollisions();

  // Гравець
  player.draw();

  requestAnimationFrame(gameLoop);
}
gameLoop();

// 🎮 Керування
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "arrowleft") player.move("left");
  if (key === "arrowright") player.move("right");
  if (key === " ") {
    player.shoot(currentWeapon);
    playSound("buy");
  }
  if (key === "w") {
    weaponIndex = (weaponIndex + 1) % weaponTypes.length;
    currentWeapon = weaponTypes[weaponIndex];
    updateWeaponUI();
    playSound("toggle");
  }
});

// 🧠 HUD
function updateWeaponUI() {
  const weaponNames = {
    normal: "🟡 Звичайна",
    strong: "🔴 Сильна",
    laser: "🔵 Лазер",
  };
  document.getElementById("weaponType").textContent =
    weaponNames[currentWeapon];
}

// 💥 Перевірка зіткнень
function checkCollisions() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (collisionDetected(enemy, bullet)) {
        bullet.explode();
        enemies.splice(enemyIndex, 1);
        bullets.splice(bulletIndex, 1);
        handleEnemyDestroyed();
      }
    });

    asteroids.forEach((asteroid, asteroidIndex) => {
      if (collisionDetected(asteroid, bullet)) {
        bullet.explode();
        asteroids.splice(asteroidIndex, 1);
        bullets.splice(bulletIndex, 1);
      }
    });
  });
}

// 💣 Колізії
function collisionDetected(a, b) {
  return (
    b.x < a.x + a.width &&
    b.x + b.width > a.x &&
    b.y < a.y + a.height &&
    b.y + b.height > a.y
  );
}

// 🏆 Рахунок
function handleEnemyDestroyed() {
  currentScore += 10;
  document.getElementById("score").textContent = currentScore;
  updateScore(currentScore);
  updateHighScoreUI();
  showToast(`+10 очок!`);
}

// 🌠 При старті
updateWeaponUI();
updateHighScoreUI();

// 🎧 Після HUD
document.body.addEventListener("htmx:afterSwap", (e) => {
  if (e.detail.target.id === "hud-container") {
    updateWeaponUI();
    updateHighScoreUI();
  }
});
