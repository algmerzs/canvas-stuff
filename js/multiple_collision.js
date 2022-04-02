import {
  randomIntFromRange,
  randomColor,
  getDistance,
  resolveCollision,
} from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

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
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5,
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update = (particles) => {
    this.draw();

    for (let index = 0; index < particles.length; index++) {
      if (this === particles[index]) continue;

      if (
        getDistance(this.x, this.y, particles[index].x, particles[index].y) -
          this.radius * 2 <
        0
      ) {
        resolveCollision(this, particles[index]);
      }
    }

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.velocity.dx = -this.velocity.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.velocity.dy = -this.velocity.dy;
    }

    this.x += this.velocity.dx;
    this.y += this.velocity.dy;
  };
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 4; i++) {
    const radius = 100;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);

    if (i !== 0) {
      for (let index = 0; index < particles.length; index++) {
        if (
          getDistance(x, y, particles[index].x, particles[index].y) -
            radius * 2 <
          0
        ) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          index = -1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, randomColor()));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(particles);
  });
}

init();
animate();
