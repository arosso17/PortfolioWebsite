let pipes = [];

let menu = true;

let score = 0;

let dead = false;

let key_timer = 0;

class Bird {
  constructor (pos) {
    this.pos = pos;
    this.vel = 0;
  }
  display () {
    fill(200, 20, 20);
    this.pos.y += this.vel;
    circle(this.pos.x, this.pos.y, 30);
    this.vel += 0.4;
    this.vel = constrain(this.vel, -10, 10)
    fill(255, 255, 255);
  }
}


function draw_pipes () {
  fill(230, 230, 0);
  for (let i=0; i < pipes.length; i++) {
    rect(pipes[i].x, 0, 50, pipes[i].y);
    rect(pipes[i].x - 10, pipes[i].y - 30, 70, 30, 5);
    rect(pipes[i].x, pipes[i].y + 120, 50, canvas.height - pipes[i].y - 120);
    rect(pipes[i].x - 10, pipes[i].y + 120, 70, 30, 5);
  }
  fill(255, 255, 255);
}


function process_pipes () {
  fill(230, 230, 0);
  let remove_first = false;
  for (let i=0; i < pipes.length; i++) {
    pipes[i].x -= 3;
    if (pipes[i].x < -50) {
      remove_first = true;
    }
    else {
      rect(pipes[i].x, 0, 50, pipes[i].y);
      rect(pipes[i].x - 10, pipes[i].y - 30, 70, 30, 5);
      rect(pipes[i].x, pipes[i].y + 120, 50, canvas.height - pipes[i].y - 120);
      rect(pipes[i].x - 10, pipes[i].y + 120, 70, 30, 5);
    }
    if (40 < pipes[i].x && pipes[i].x < 110) {
      if (pipes[i].y > bird.pos.y - 10 || bird.pos.y + 10 > pipes[i].y + 120) {
        // console.log("hit!");
        menu = true;
        dead = true;
        key_timer = 30;
      }
    }
    if (73 < pipes[i].x && pipes[i].x < 76) {
        score += 1;
        // console.log(score);
    }
  }
  if (remove_first) {
    pipes.shift();
  }
  if (pipes[pipes.length - 1].x < 225) {
    pipes.push(createVector(500, 200 + random() * 100 - 50));
  }
  fill(255, 255, 255);
}


let bird;

function keyPressed() {
  if (key_timer == 0) {
    if (keyCode === 32) {
      if (menu) {
        if (dead) {
            dead = false;
            pipes = [];
            pipes.push(createVector(500, 200));
            score = 0;
            bird.pos.y = 250;
          }
        else {
          menu = false;
        }
      }
      bird.vel = -8;
    }
  }
}

class terrain {
  constructor (shift, speed, r, g, b) {
    this.terrain = [];
    this.shift = shift;
    this.r = r;
    this.g = g;
    this.b = b;
    this.speed = speed;
    this.terrain_timer = 0;
    for (let i = -2; i < 8; i++) {
    this.terrain.push({x:i * 100, y:random() * 100 + this.shift});
    }
  }
  draw_terrain(move=true) {
    if (move) {
      this.terrain_timer += 1;
    }
    if (this.terrain_timer > 100 / this.speed) {
      this.terrain.push({x:700, y:random() * 100 + this.shift});
      this.terrain_timer = 0;
    }
    if (this.terrain[2].x < 0) {
        this.terrain.shift();
        }
    fill(this.r, this.g, this.b)
    beginShape();
    vertex(-300, 800);
    for (let i = 0; i < this.terrain.length; i++) {
      curveVertex(this.terrain[i].x, this.terrain[i].y);
      if (move) {
        this.terrain[i].x -= this.speed;
      }
    }
    vertex(800, 800);
    endShape(CLOSE);
    fill(255, 255, 255)
  }
}

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('sketch_container');
  let cont = document.getElementById("sketch_container");
  cont.classList.add("p5js")
  strokeWeight(2);
  bird = new Bird(createVector(100, 250));
  pipes.push(createVector(500, 200));
  textSize(20);
  textAlign(CENTER);
  terrain_b = new terrain(200, 1, 0, 100, 0)
  terrain_f = new terrain(300, 2, 50, 255, 50)
}

function draw() {
  background(115, 215, 255);
  terrain_b.draw_terrain(!menu);
  terrain_f.draw_terrain(!menu);
  if (menu) {
    bird.vel = 0;
    if (dead) {
      bird.display();
      draw_pipes();
      fill(0, 0, 0, 100);
      rect(150, 150, 200, 200, 15)
      fill(255, 255, 255);
      textSize(29);
      text("You died!", 250, 200);
      text("Score: " + score, 250, 250);
      fill(255, 255, 255, 200);
      textSize(20);
      text("SPACE to restart", 250, 300);
      fill(255, 255, 255);
    }    
    else {
    bird.display();
    draw_pipes();
    textAlign(RIGHT);
    text("Score: " + score, 470, 30);
    textAlign(CENTER);
    text("Press SPACE to start!", 250, 200);
    }
  }
  else{
    bird.display();
    process_pipes();
    textAlign(RIGHT);
    text("Score: " + score, 470, 30);
    textAlign(CENTER);
  }
  if (key_timer != 0) {
    key_timer -= 1;
  }
}