import { randomIntFromRange, randomColor, getDistance } from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let objects;
let circle1;
let circle2;
function init() {
  circle1 = new Circle(200, 150, 100, "blue");
  circle2 = new Circle(undefined, undefined, 50, "green");

  objects = [];

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circle2.x = mouse.x;
  circle2.y = mouse.y;
  let olderColor;
  if (
    getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <
    circle1.radius + circle2.radius
  ) {
    olderColor = circle1.color;
    circle1.color = "black";
  } else {
    circle1.color = olderColor;
  }
  circle1.update();
  circle2.update();
}

init();
animate();
