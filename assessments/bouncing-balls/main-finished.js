// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// define shape constructor

class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = Boolean(exists);
  }
}

// define ball constructor by calling shape constructor

class Ball extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }
  
  // define ball draw method

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  };

  // define ball update method

  update() {
    if((this.x + this.size) >= width) this.velX = -(this.velX);
    if((this.x - this.size) <= 0) this.velX = -(this.velX);
    if((this.y + this.size) >= height) this.velY = -(this.velY);
    if((this.y - this.size) <= 0) this.velY = -(this.velY);

    this.x += this.velX;
    this.y += this.velY;
  };

  // define ball collision detection

  collisionDetect() {
    for(let j = 0; j < balls.length; j++) {
      if(!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
        }
      }
    }
  };
}

// define evil circle constructor by calling shape constructor

class EvilConstructor extends Shape {
  constructor(x, y, exists) {
    super(x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 10;
  }

  // define evil constructor draw method

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // define evil constructor checkBounds method

  checkBounds() {
    if((this.x + this.size) >= width) this.x -= this.size;
    if((this.x - this.size) <= 0) this.x -= this.size;
    if((this.y + this.size) >= height) this.y -= this.size;
    if((this.y - this.size) <= 0) this.y -= this.size;
  }

  // define evil constructor collisionDetect method

  collisionDetect() {
    for(let j = 0; j < balls.length; j++) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // set ball in collision to not exist
      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  };

  // define evil constructor setControls method

  setControls() {
    let _this = this;
    window.onkeydown = (e) => {
      if (e.key === 'a') _this.x -= _this.velX;
      if (e.key === 'd') _this.x += _this.velX;
      if (e.key === 'w') _this.y -= _this.velY;
      if (e.key === 's') _this.y += _this.velY;
    }
  }
}

// define array to store balls and populate it

let balls = [];

while(balls.length < 25) {
  const size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one Shape width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);
}

let evilBall = new EvilConstructor(
  random(0 + random(10,20),width - random(10,20)),
  random(0 + random(10,20),height - random(10,20)),
  true
);
evilBall.setControls();

// capture number of balls displayed

let count = balls.length;
document.getElementById('ball-count').innerText = 'Ball count: ' + String(count); 

// define loop that keeps drawing the scene constantly

loop = () => {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  count = 0;
  for(let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      count++;
    }
    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();
  }
  document.getElementById('ball-count').innerText = 'Ball count: ' + String(count); 
  
  requestAnimationFrame(loop);
}

loop();