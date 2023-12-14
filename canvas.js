let canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

let c = canvas.getContext("2d");
// c.fillStyle = "rgba(255,0,0,0.5";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.5";
// c.fillRect(300, 150, 100, 100);
// c.fillStyle = "rgba(0,0,255,0.5";
// c.fillRect(200, 290, 100, 100);
// console.log(canvas);

// Line

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 200);
// c.lineTo(400, 300);
// c.lineTo(400, 300);
// c.lineTo(50, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// Arc / Circle

// c.beginPath();
// c.arc(400, 400, 50, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (let i = 0; i < 100; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 50, Math.PI * 2, false);
//   c.strokeStyle = "blue";
//   c.stroke();
//   //   console.log(x, y);
// }

// let y = Math.random() * innerHeight;
// let dy = 9;
// let x = Math.random() * innerWidth;
// let dx = 9;
// let radius = 30;

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function rgb() {
  return Math.floor(Math.random() * 256);
}

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.dx = dx;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.color = `rgb(${rgb()},${rgb()},${rgb()})`;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    // c.strokeStyle = this.color;
    // c.stroke();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
    this.x += this.dx;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < 70) {
        this.radius += 7;
      }
    } else if (this.radius > 7) {
      this.radius -= 3;
    }
    this.draw();
  };
}

let circleArray = [];
for (let i = 0; i < 500; i++) {
  let radius = 70;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerWidth - radius * 2) + radius;
  let dx = Math.random() - 0.5 * 5;
  let dy = Math.random() - 0.5 * 5;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

let circle = new Circle(200, 200, 0.5, 0.5, 10);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let circle of circleArray) {
    circle.draw();
    circle.update();
  }
  circle.update();
}

animate();
