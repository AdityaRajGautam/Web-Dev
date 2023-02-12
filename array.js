"use strict";
const calctip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const bills = [125, 555, 44];
const tips = [calctip(bills[0]), calctip(bills[1]), calctip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals);

const jonas = {
  fname: "aditya",
  lname: "raj",
  friend: ["shroud", "s1mple", "timmy"],
};

console.log(
  `${jonas.fname} has ${jonas.friend.length} friends and his best friend is ${jonas.friend[0]}`
);

const jonas2 = {
  fname: "aditya",
  lname: "raj",
  birthyear: 1991,
  friend: ["shroud", "s1mple", "timmy"],
  hasDriverLiscence: true,

  calcAge: function () {
    this.age = 2037 - this.birthyear;
    return this.age;
  },

  getSummary: function () {
    return `${this.fname} is ${this.calcAge()} years old and he has ${
      this.hasDriverLiscence ? "a" : "no"
    } drivers liscence`;
  },
};

console.log(jonas2.calcAge());
// console.log(age);
console.log(jonas2.getSummary());
