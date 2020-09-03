class Shape {
  constructor(name, sides, sideLength){
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }
  calcPerimeter() {
    console.log(this.sides * this.sideLength);
  }
}

class Square extends Shape {
  constructor(name, sideLength) {
    super(name, 4, sideLength);
  }
  calcArea() {
    console.log(this.sideLength * this.sideLength);
  }
}

let square = new Square('es6ClassSquare', 5);
square.calcPerimeter();
square.calcArea();