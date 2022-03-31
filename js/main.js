var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var circleArray = new Array();

class Circle {
  constructor(x, y, dx, dy, radius, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = `rgb(${this.r},${this.g},${this.b})`;
    context.fillStyle = `rgba(${this.r},${this.g},${this.b}, 0.3)`;
    context.fill();
    context.stroke();
  }

  updatePosition() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

for (let index = 0; index < 50; index++) {
  var x = Math.random() * (innerWidth - radius * 2) + radius,
    y = Math.random() * (innerHeight - radius * 2) + radius,
    dx = (Math.random() - 0.5) * 8,
    dy = (Math.random() - 0.5) * 8,
    radius = 50,
    r = Math.round(Math.random() * 255),
    g = Math.round(Math.random() * 255),
    b = Math.round(Math.random() * 255);

  circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
}

const animateCircle = () => {
  requestAnimationFrame(animateCircle);

  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let index = 0; index < circleArray.length; index++) {
    circleArray[index].updatePosition();
  }
};

animateCircle();
