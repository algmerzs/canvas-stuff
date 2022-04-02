let canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let colorPallet = [
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
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

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
    this.dx = dx;
    this.dy = dy;
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
    context.closePath();
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

const distance = (el1, el2) => {
  const xDist = el1.x + el1.radius - (el2.x + el1.radius);
  const yDist = el1.y + el1.radius - (el2.y + el1.radius);

  //   // Better performance algo
  //   return (
  //     el1.x * el1.x +
  //     2 * el2.x * el2.radius +
  //     el2.radius * el2.radius
  //   );

  //   return {
  //     y1: el1.y,
  //     x1: el1.x,
  //     x2: el2.x,
  //     y2: el2.y,
  //     radius1: el1.radius,
  //     radius2: el2.radius,
  //   };

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

let objects = new Array();
let ball1, ball2;

const initObjects = () => {
  objects = [];
  ball1 = new Ball(200, 200, 0, 0, 30, randomColor());
  ball2 = new Ball(
    undefined,
    undefined,
    undefined,
    undefined,
    30,
    randomColor()
  );
  for (let index = 0; index < 400; index++) {
    // Do something
    // objects.push()
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  ball1.update();
  ball2.x = mousePos.x;
  ball2.y = mousePos.y;
  ball2.update();

  if (distance(ball1, ball2) < ball1.radius * 2) {
    ball1.x += 1;
  }
};

initObjects();
animate();
