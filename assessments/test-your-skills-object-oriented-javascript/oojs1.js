function Shape(name, sides, sideLength) {
  this.name = name;
  this.sides = sides;
  this.sideLength = sideLength;
}

// Write your code below here
    Shape.prototype.calcPerimeter = function() {
      console.log(this.sides * this.sideLength);
    }
    let square = new Shape('newSquare', 4, 5);
    square.calcPerimeter();
    let triangle = new Shape('newTriangle', 3, 3);
    triangle.calcPerimeter();