import Bullet from "./bullet.js";

export default class Player {
  constructor(canvas, bullets) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.bullets = bullets;

    this.width = 100;
    this.height = 100;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 20;
    this.speed = 15;

    this.image = new Image();
    this.image.src = "assets/images/ship.png";
    this.image.onload = () => console.log("🖼 Корабель завантажився успішно!");

    this.weaponTypes = ["normal", "strong", "laser"];
    this.weaponIndex = 0;
  }

  move(direction) {
    if (direction === "left" && this.x > 0) {
      this.x -= this.speed;
    }
    if (direction === "right" && this.x + this.width < this.canvas.width) {
      this.x += this.speed;
    }
  }

  shoot(weaponType) {
    console.log(`🚀 Вогонь! (${weaponType})`);
    const bullet = new Bullet(
      this.canvas,
      this.x + this.width / 2 - 5,
      this.y,
      weaponType
    );
    this.bullets.push(bullet);
  }

  changeWeapon() {
    this.weaponIndex = (this.weaponIndex + 1) % this.weaponTypes.length;
    console.log(`🔄 Зміна зброї: ${this.weaponTypes[this.weaponIndex]}`);
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
