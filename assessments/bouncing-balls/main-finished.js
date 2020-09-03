// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define shape constructor

function Shape(x, y, velX, velY) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
}

// define ball constructor

function Ball() {

}

// ball inherits 

Ball.prototype = Shape.prototype;

// define shape draw method

Shape.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define shape update method

Shape.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define shape collision detection

Shape.prototype.collisionDetect = function() {
  for(let j = 0; j < shapes.length; j++) {
    if(!(this === shapes[j])) {
      const dx = this.x - shapes[j].x;
      const dy = this.y - shapes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + shapes[j].size) {
        shapes[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store shapes and populate it

let shapes = [];

while(shapes.length < 25) {
  const size = random(10,20);
  let shape = new Shape(
    // shape position always drawn at least one Shape width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  shapes.push(shape);
}

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
    shapes[i].update();
    shapes[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();