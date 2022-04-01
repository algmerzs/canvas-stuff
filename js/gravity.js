let canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d"),
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
  },
  gravity = 0.9,
  friction = 0.99,
  minCloseness = 50;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("mousemove", (event) => {
  mousePos.x = event.clientX;
  mousePos.y = event.clientY;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initObjects();
});

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = `rgba(${this.color},0.3)`;
    context.fill();
    context.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      mousePos.x - this.x < minCloseness &&
      mousePos.x - this.x > -minCloseness &&
      mousePos.y - this.y < minCloseness &&
      mousePos.y - this.y > -minCloseness
    ) {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.x -= this.dx;
      }
      this.x += this.dx;
    }

    this.y += this.dy;
    this.x;
    this.draw();
  }
}
// some utils
const randomColor = () =>
  colorPallet[Math.round(Math.random() * colorPallet.length)];

const randomIntFromRange = (min, max) =>
  Math.round(Math.random() * (max - min + 1) + min);

const distance = (x1, x2, y1, y2) => {
  const xDist = x1 - x2;
  const yDist = y1 - y2;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

let ballArray = new Array();

const initObjects = () => {
  ballArray = [];
  for (let index = 0; index < 50; index++) {
    let radius = randomIntFromRange(10, 30);
    ballArray.push(
      new Ball(
        randomIntFromRange(radius, canvas.width - radius),
        randomIntFromRange(0, canvas.height - radius),
        randomIntFromRange(-2, 2),
        5,
        radius,
        randomColor()
      )
    );
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let index = 0; index < ballArray.length; index++) {
    ballArray[index].update();
  }
};

animate();
initObjects();
