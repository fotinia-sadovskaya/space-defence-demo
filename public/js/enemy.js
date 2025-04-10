export default class Enemy {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.speed = 2 + Math.random() * 1.5;

    this.width = 50;
    this.height = 50;

    this.image = new Image();
    this.image.src = "assets/images/enemy.png";
    this.image.onload = () => console.log("🖼 Ворог завантажився успішно!");
  }

  move() {
    this.y += this.speed;
  }

  draw() {
    if (this.image && this.image.complete) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = "red";
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
