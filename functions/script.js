"use strict";

///////////////////////////////////////
// Default Parameters
// const bookings = [];

// const createBookings = function (
//   flightNum,
//   numPassangers = 1,
//   price = 199 * numPassangers
// ) {
//   const booking = {
//     flightNum,
//     numPassangers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
// createBookings("LH123");
// createBookings("LH123", 3);
// createBookings("LH123", 3, 200);
// createBookings("WQ143", undefined, 200);

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference

// const flight = "LH234";
// const aditya = {
//   name: "aditya raj gautam",
//   passport: 24739479284,
// };
// const checkIn = function (flightNum, passenger) {
//   flightNum = "LH999";
//   passenger.name = "Mr. " + passenger.name;
//   if (passenger.passport === 24739479284) {
//     alert("Checked in");
//   } else {
//     alert("Wrong passport!");
//   }
// };

// checkIn(flight, aditya);
// console.log(flight);
// console.log(aditya);

// // Is the same as doing...
// const flightNum = flight;
// const passenger = aditya;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000);
// };
// newPassport(aditya);
// checkIn(flight, aditya);

///////////////////////////////////////
// Functions Accepting Callback Functions
// const oneWord = function (str) {
//   return str.replaceAll(" ", "").toLowerCase();
// };
// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(" ");
//   return [first.toUpperCase(), ...others].join(" ");
// };

// // Higher-order function
// const transformer = function (str, fn) {
//   console.log(`original string: ${str}`);
//   console.log(`transformed string: ${fn(str)}`);
//   console.log(`function name:  ${fn.name}`);
// };
// transformer("JavaScript is the Best!", upperFirstWord);
// transformer("JavaScript is the Best!", oneWord);

///////////////////////////////////////
// Functions returning functions

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
// const greeter = greet("Hey");
// console.log(greeter);
// greeter("aditya");

// // alternate
// greet("hello")("aditya");

// // arrow function
// const arrowGreet = (greeting) => (name) => console.log(`${greeting} ${name}`);
// arrowGreet("hello")("aditya");

///////////////////////////////////////
// the call and apply method

// const lufthanse = {
//   airline: "lufthansa",
//   iatacode: "LH",
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
//   },
// };
// lufthanse.book(234, "aditya");
// console.log(lufthanse);

// const spiceJet = {
//   airline: "Spice Jet",
//   iatacode: "SJ",
//   bookings: [],
// };
// const book = lufthanse.book;

// // this does not work
// // book(23, "Shroud");

// // call method
// book.call(spiceJet, 23, "aditya");
// console.log(spiceJet);

// book.call(lufthanse, 45, "virat kohli");
// console.log(lufthanse);

// const swiss = {
//   airline: "Swiss Air Lines",
//   iataCode: "LX",
//   bookings: [],
// };
// book.call(swiss, 583, "Mary Cooper");
// console.log(swiss);

// // apply method
// const flightDetails = [564, "dhoni"];
// book.apply(swiss, flightDetails);
// console.log(swiss);

// book.call(swiss, ...flightDetails);

// // bind Method
// const bookSJ = book.bind(spiceJet);
// const bookLH = book.bind(lufthanse);
// const bookLX = book.bind(swiss);
// // bookSJ(45, "aditya");
// // console.log(spiceJet);
// const bookSJ23 = book.bind(spiceJet, 23);
// bookSJ23("Aditya");

// // With event listner
// lufthanse.planes = 300;
// lufthanse.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// // lufthanse.buyPlane();
// document
//   .querySelector(".buy")
//   .addEventListener("click", lufthanse.buyPlane.bind(lufthanse));

// // partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(300));
// console.log(addVAT(200));

// //Same using function returnning function

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// const addVAT2 = addTaxRate(0.23);

// console.log(addVAT2(300));
// console.log(addVAT2(200));

///////////////////////////////////////
// Coding Challenge #1

// const poll = {
//   question: "What is your favourite programming language?",
//   options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const answer = prompt(
//       `${this.question}\n${this.options.join("\n")}\n(Write option number)`
//     );
//     console.log(answer);
//     if (answer < this.options.length) {
//       this.answers[answer]++;
//     }
//     // console.log(this.answers);
//     this.displayResults();
//     this.displayResults("string");
//   },
//   displayResults(type = "array") {
//     if (type == "array") {
//       console.log(this.answers);
//     }
//     if (type == "string") {
//       console.log(`Poll results are ${this.answers.join(", ")}`);
//     }
//   },
// };
// document
//   .querySelector(".poll")
//   .addEventListener("click", poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] }, "string");
// poll.displayResults.call({ answers: [5, 2, 3] });

// // [5, 2, 3]
// // [1, 5, 3, 9, 6, 1]

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)

// const runOnce = function () {
//   console.log("this function will never run again");
// };
// runOnce();

// // IIFE
// (function () {
//   console.log("this function will never run again");
// })();

// (() => console.log("this function will also never run again"))();

// {
//   const isPrivate = 23;
//   var isNotPrivate = 24;
// }
// // console.log(isPrivate);
// console.log(isNotPrivate);

///////////////////////////////////////
// closures
// const secureBooking = function () {
//   let passangerCount = 0;
//   return function () {
//     passangerCount++;
//     console.log(`${passangerCount} passangers`);
//   };
// };
// const booker = secureBooking();
// booker();
// booker();
// booker();
// booker();

// console.dir(booker);

// // EXAMPLE 1
// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };
// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// console.dir(f);

// // re-assingning f function
// h();
// f();
// console.dir(f);

// // EXAMPLE 2
// const boardPassangers = function (n, wait) {
//   const perGroup = n / 3;
//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passangers`);
//     console.log(`There are 3 groups,each with ${perGroup} passangers`);
//   }, wait * 1000);

//   console.log(`the boarding will start in ${wait} seconds`);
// };
// const perGroup = 1000;
// boardPassangers(99, 5);

///////////////////////////////////////
// coding challange 2
(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
