"strict";

///////////////////////////////////////
// Constructor Functions and the new Operator
// const Person = function (name, birthYear) {
//   //Instance Properties
//   this.name = name;
//   this.birthYear = birthYear;

//   //Never do this
//   //   this.calcAge = function () {
//   //     console.log(2023 - this.birthYear);
//   //   };
// };

// // 1. New {} is created
// // 2. Function is called, this={}
// // 3. {} Linked to prototype
// // 4.function automatically return {}

// Person.hey = function () {
//   console.log("hey there");
//   console.log(this);
// };
// Person.hey();

// const aditya = new Person("aditya", 2003);
// console.log(aditya);

// const x = new Person("x", 2004);
// const y = new Person("y", 2005);

// console.log(x, y);

// console.log(aditya instanceof Person);

// ///////////////////////////////////////
// // Prototypes
// Person.prototype.calcAge = function () {
//   console.log(2023 - this.birthYear);
// };

// aditya.calcAge();

// console.log(aditya.__proto__);
// console.log(aditya.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(aditya));
// console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype.species = "homoSapiens";
// console.log(aditya.species, x.species);

// console.log(aditya.hasOwnProperty("name"));
// console.log(aditya.hasOwnProperty("species"));

// ///////////////////////////////////////
// // Prototypal Inheritance on Built-In Objects
// // Obect.Prototype(top of the prototype chain)
// console.log(aditya.__proto__.__proto__);
// console.log(aditya.__proto__.__proto__.__proto__);

// console.log(Person.prototype.constructor);
// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 5, 6, 3, 6, 5]; // new Array === [];
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__);
// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// console.dir((x) => x + 1);

// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h
// GOOD LUCK 😀
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed + "km/h");
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed + "km/h");
// };

// const bmw = new Car("BMW", 120);
// const mercedes = new Car("Mercedes", 195);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

///////////////////////////////
// ES6 classes

// Class Expression
// const PersonCl =class{}

// Class decleration
// class PersonCl {
//   constructor(fullname, birthYear) {
//     this.fullname = fullname;
//     this.birthYear = birthYear;
//   }

//   // Method Will be added to .prototype Property
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullname(name) {
//     if (name.includes(" ")) {
//       this._fullname = name;
//     } else {
//       alert(`${name} is not a full name`);
//     }
//   }

//   get fullname() {
//     this._fullname = fullname;
//   }

//   // Static Method (they are not available on instances)
//   static hey() {
//     console.log("hey 👋");
//     console.log(this);
//   }
// }

// const aadi = new PersonCl("Aadi raj", 2003);
// console.log(aadi);
// aadi.calcAge();
// console.log(aadi.age);
// console.log(PersonCl.hey());

// console.log(aadi.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this._fullname}`);
// };
// aadi.greet();

// // 1. Classes are NOT hoisted
// // 2. Classes are first-class citizens
// // 3. Classes are executed in strict mode

// ///////////////////////////////////
// // Getters and Setters

// const account = {
//   owner: "Aditya",
//   movements: [300, 200, 400, 700],

//   get latest() {
//     return this.movements[this.movements.length - 1];
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest);

// account.latest = 200;
// console.log(account.movements);

/////////////////////////////
// Object.create
// const PersonProto = {
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   },
//   init(name, birthyear) {
//     this.name = name;
//     this.birthYear = birthyear;
//   },
// };

// const aadi = Object.create(PersonProto);
// console.log(aadi);
// aadi.name = "Aditya";
// aadi.birthYear = "2003";
// aadi.calcAge();

// const alpha = Object.create(PersonProto);
// alpha.init("alpha", 2004);
// alpha.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.speed}km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.speed}km/h`);
//   }

//   get speedUS() {
//     return `${this.speed / 1.6}mi/h`;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCl("Ford", 120);
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.accelerate();
// console.log(ford.speedUS);

// ford.speedUS = 50;
// console.log(ford);

////////////////////////////////////////
//Inheritance between "classes":Constuctor functions

// const Person = function (fullName, birthYear) {
//   this.fullName = fullName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (fullName, birthYear, course) {
//   Person.call(this, fullName, birthYear);
//   this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.fullName} and I study ${this.course}.`);
// };

// const mike = new Student("Shroud", 2003, "Gaming");
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// console.log(mike instanceof Object);

// Student.prototype.Constructor = Student;
// console.dir(Student.prototype.Constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// const tesla = new EV("Tesla", 120, 23);

// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(60);
// console.log(tesla);

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes
// class PersonCl {
//   constructor(fullname, birthYear) {
//     this.fullname = fullname;
//     this.birthYear = birthYear;
//   }

//   // Method Will be added to .prototype Property
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullname(name) {
//     if (name.includes(" ")) {
//       this._fullname = name;
//     } else {
//       alert(`${name} is not a full name`);
//     }
//   }

//   get fullname() {
//     return this._fullname;
//   }

//   // Static Method (they are not available on instances)
//   static hey() {
//     console.log(`hey 👋`);
//     // console.log(this);
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullname, birthYear, course) {
//     // Always have to do this
//     super(fullname, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullname} and I study ${this.course}`);
//   }

//   calcAge() {
//     console.log(`My age is ${2023 - this.birthYear}`);
//   }
// }

// const mike = new StudentCl("Michael Shroud", 2003, "gaming");
// mike.calcAge();
// mike.introduce();
// PersonCl.hey();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   },
//   init(name, birthyear) {
//     this.name = name;
//     this.birthYear = birthyear;
//   },
// };

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (name, birthYear, course) {
//   PersonProto.init.call(this, name, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.name} and I study ${this.course}`);
// };

// const simple = Object.create(StudentProto);
// simple.init("s1mple", 2003, "GOAT");
// simple.introduce();
// simple.calcAge();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also a static version )

// class Account {
//   // 1) Public fields(instances)
//   locale = navigator.language;

//   // 2) Private fields(instances)
//   #movements = [];
//   #pin;

//   constructor(name, currency, pin) {
//     this.name = name;
//     this.currency = currency;
//     // Protected property
//     this.#pin = pin;
//     // this._movements = [];
//     // this.locale = navigator.language;
//   }

//   //   Public Interface
//   // 3) Public methods
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }

//   withdrawl(val) {
//     this.deposit(-val);
//     return this;
//   }

//   requestLoan(val) {
//     if (this.#approveLoan(val)) {
//       this.deposit(val);
//       console.log("Loan Approved");
//       return this;
//     }
//   }
//   // 4) Private methods
//   #approveLoan(val) {
//     return true;
//   }

//   //   static
//   static helper() {
//     console.log("Helper");
//   }
// }

// const acc1 = new Account("Aditya", "INR", 1817);

// // acc1.movements.push(250);
// // acc1.movements.push(-140);

// acc1.deposit(1000);
// acc1.withdrawl(500);
// console.log(acc1.getMovements());
// acc1.requestLoan(1000);

// console.log(acc1);
// Account.helper();

// // console.log(acc1.#movements);
// // console.log(acc1.pin);
// // console.log(acc1.#pin);
// // console.log(acc1.#approveLoan(1000));

// // Chaining
// acc1.deposit(300).deposit(500).withdrawl(35).requestLoan(25000).withdrawl(4000);
// console.log(acc1.getMovements());

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!
DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The Rivian is going at ${this.speed}km/h`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`The Rivian is going at ${this.speed}km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(rivian.speedUS);
