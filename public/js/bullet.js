export default class Bullet {
  constructor(canvas, x, y, type = "normal") {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.type = type;

    if (this.type === "normal") {
      this.speed = 7;
      this.damage = 1;
      this.width = 5;
      this.height = 15;
      this.color = "yellow";
    } else if (this.type === "strong") {
      this.speed = 5;
      this.damage = 3;
      this.width = 10;
      this.height = 25;
      this.color = "red";
    } else if (this.type === "laser") {
      this.speed = 10;
      this.damage = 5;
      this.width = 3;
      this.height = 30;
      this.color = "cyan";
    }

    // Завантаження спрайту (тільки якщо хочеш sprite)
    this.image = new Image();
    this.setImage();
  }

  setImage() {
    if (this.type === "laser") {
      this.image.src = "assets/images/laser-sprite.png";
      this.width = 8;
      this.height = 48;
    } else {
      this.image.src = "assets/images/bullet.png";
    }
  }

  move() {
    this.y -= this.speed;
  }

  draw() {
    if (this.image && this.image.complete) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  isOutOfScreen() {
    return this.y < 0;
  }

  explode() {
    this.image.src = "assets/images/explosion.png";
    this.width = 30;
    this.height = 30;
    setTimeout(() => {
      this.remove = true;
    }, 300);
  }
}
