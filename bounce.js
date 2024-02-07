const canvas = document.getElementById("heroCanvas");
// document.body.style.height = "100vh";

const ctx = canvas.getContext("2d");

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = "rgba(5,255,255,0.1)";
}

setCanvasSize()

window.addEventListener('resize', setCanvasSize);

var rect = canvas.getBoundingClientRect();
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle = "rgba(5,255,255,0.1)";

// ctx.imageSmoothingEnabled = true;

const particles = [];

function getDist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function init() {
  for (let i = 0; i < 100; i += 1) {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    const speedX = Math.random();
    const speedY = Math.random();
    const dirX = Math.random() > 0.5 ? 1 : -1;
    const dirY = Math.random() > 0.5 ? 1 : -1;

    particles.push({
      x,
      y,
      speedX: dirX * speedX,
      speedY: dirY * speedY,
      neighbors: [],
    });
  }
  requestAnimationFrame(draw);
}

let mouseX;
let mouseY;

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00FF00";

  for (let i = 0; i < particles.length; i += 1) {
    let x = particles[i].x + particles[i].speedX;
    let y = particles[i].y + particles[i].speedY;
    if (x < 0 || x > canvas.width) {
      particles[i].speedX *= -1
    }

    if (y < 0 || y > canvas.height) {
        particles[i].speedY *= -1
    }


    ctx.moveTo(x, y);
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    particles[i].x = x;
    particles[i].y = y;
  }
  ctx.fill();

  for (let i = 0; i < particles.length; i += 1) {
    const x = particles[i].x;
    const y = particles[i].y;
    const neighbors = particles[i].neighbors;
    for (let j = 0; j < neighbors.length; j += 1) {
      const x1 = neighbors[j].x;
      const y1 = neighbors[j].y;
      const dist = getDist(x, y, x1, y1);
      if (dist < 200) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}

init();


setInterval(() => {
  const copy = [...particles];
  for (let i = 0; i < particles.length; i += 1) {
    const x = particles[i].x;
    const y = particles[i].y;

    copy.sort((a, b) => {
      const x1 = a.x;
      const x2 = b.x;
      const y1 = a.y;
      const y2 = b.y;
      const dist1 = getDist(x, y, x1, y1);
      const dist2 = getDist(x, y, x2, y2);
      return dist1 - dist2;
    });

    particles[i].neighbors = copy.slice(0, 7);
  }
}, 250);