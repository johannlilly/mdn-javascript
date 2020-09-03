class Shape extends Object {
  constructor(name, sides, sideLength){
    super();
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }
  calcPerimeter() {
    console.log(this.sides * this.sideLength);
  }
}

let square = new Shape('es6Square', 4, 5);
square.calcPerimeter();

let triangle = new Shape('es6Triangle', 3, 3);
triangle.calcPerimeter();