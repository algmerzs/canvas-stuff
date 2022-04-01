let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circleArray = new Array(),
  minCloseness = 50,
  maxRadius = 100,
  minRadius = 5,
  colorPallet = [
    "251, 248, 204",
    "253, 228, 207",
    "255, 207, 210",
    "241, 192, 232",
    "207, 186, 240",
    "163, 196, 243",
    "144, 219, 244",
    "142, 236, 245",
    "152, 245, 225",
    "185, 251, 192",
  ],
  mousePos = {
    x: undefined,
    y: undefined,
  };

window.addEventListener("mousemove", (event) => {
  mousePos.x = event.x;
  mousePos.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initCircles();
});

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = `rgb(${this.color})`;
    context.fillStyle = `rgba(${this.color},0.3)`;
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

    if (
      mousePos.x - this.x < minCloseness &&
      mousePos.x - this.x > -minCloseness &&
      mousePos.y - this.y < minCloseness &&
      mousePos.y - this.y > -minCloseness &&
      this.radius < maxRadius
    ) {
      this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const initCircles = () => {
  circleArray = [];
  for (let index = 0; index < 400; index++) {
    let radius = Math.random() * 10 + minRadius,
      x = Math.random() * (innerWidth - radius * 2) + radius,
      y = Math.random() * (innerHeight - radius * 2) + radius,
      dx = (Math.random() - 0.5) * 2,
      dy = (Math.random() - 0.5) * 2,
      color = colorPallet[Math.round(Math.random() * colorPallet.length)];

    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
};

const animateCircle = () => {
  requestAnimationFrame(animateCircle);

  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let index = 0; index < circleArray.length; index++) {
    circleArray[index].updatePosition();
  }
};

initCircles();
animateCircle();
