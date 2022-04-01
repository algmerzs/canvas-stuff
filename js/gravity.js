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
  };

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
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
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

  update() {
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

let objects = new Array();
const initObjects = () => {
  let ball = new Ball(20, 20, 30, randomColor());
  objects = [];
  for (let index = 0; index < 400; index++) {
    // Do something
    // objects.push()
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  context.clearRect(0, 0, innerWidth, innerHeight);
  context.fillText("HTML CANVAS INITIALIZED CORRECTLY", mousePos.x, mousePos.y);
};

animate();
initObjects();
