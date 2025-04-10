export default class Asteroid {
  constructor(canvas, x, y, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.speed = speed || 1 + Math.random() * 3;
    this.width = 80;
    this.height = 80;

    this.image = new Image();
    this.image.src = "assets/images/asteroid.png";
    this.image.onload = () => console.log("🪨 Астероїд завантажено");
  }

  move() {
    this.y += this.speed;
  }

  draw() {
    if (this.image && this.image.complete) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = "#aaa";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  explode() {
    this.image.src = "assets/images/explosion.png";
    setTimeout(() => {
      this.remove = true;
    }, 300);
  }
}
