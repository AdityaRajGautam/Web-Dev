"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// DISPLAY TRANSACTIONS
const displayMovements = function (movements) {
  containerMovements.innerHTML = " ";
  // console.log(containerMovements.innerHTML);
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const reductionSymbol = mov < 0 ? "-" : "";
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  
    <div class="movements__value">${reductionSymbol}₨${Math.abs(mov)}</div>
  </div>
  `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

// DISPLAY SUMMARY
const calcDisplaySummary = function (movements) {
  const income = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₨${income}`;
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₨${out}`;
  const interest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * 1.2) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int > 1;
    })
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `₨${interest}`;
};
calcDisplaySummary(account1.movements);

// CREATE USERNAME
// const user = "Steven Thomas Williams";
const createUserName = function (user) {
  user.forEach(function (user) {
    user.userName = user.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
createUserName(accounts);
// console.log(accounts);

// DISPLAY BALANCE
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return (acc += mov);
  }, 0);
  labelBalance.textContent = `₨${balance}`;
};
calcDisplayBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Simple Array Methods
// let arr = ["a", "b", "c", "d", "e", "f"];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE
// console.log(`---splice--`);
// console.log(arr.splice(-1));
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// arr = ["a", "b", "c", "d", "e", "f"];
// const arr2 = [1, 2, 3, 4, 5];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const elements = arr.concat(arr2);
// console.log(elements);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(elements.join("-"));

///////////////////////////////////////
// The new at Method
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting the last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log("aditya".at(0));
// console.log("aditya".at(-1));

///////////////////////////////////////
// looping arrays :forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i}: YOU withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("---FOREACH");
// // continue and break statemaent dous not work on forEach method
// movements.forEach(function (movement, i, arr) {
//   if (movement > 0) {
//     console.log(`Movement ${i}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i}: YOU withdrew ${Math.abs(movement)}`);
//   }
//   //   console.log(arr);
// });

// // map
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
//   //   console.log(map);
// });

// // set
// const currenciesUnique = new Set(["INR", "USD", "EUR", "INR", "INR", "EUR"]);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value}: ${value}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets
HINT: Use tools from all lectures in this section so far 😉
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

// const checkDogs = function (juliasDogs, katesDog) {
//   const juliasDogsCorrected = juliasDogs.slice();
//   juliasDogsCorrected.splice(0, 1);
//   juliasDogsCorrected.splice(-2);
//   console.log(juliasDogsCorrected);

//   const dogs = juliasDogsCorrected.concat(katesDog);
//   console.log(dogs);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is an puppy, and is ${dog} years old`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

///////////////////////////////////////
// map method

// const USDtoINR = 82;

// const movementsINR = movements.map(function (mov) {
//   return mov * USDtoINR;
// });

// // using arrowwfunction
// const movementsINRarrow = movements.map((mov) => mov * USDtoINR);

// console.log(movements);
// console.log(movementsINRarrow);
// console.log(movementsINR);

// // same using for of loop

// const movementsINRfor = [];
// for (const mov of movements) {
//   movementsINRfor.push(mov * USDtoINR);
// }
// console.log(movementsINRfor);

// const movementsDescriptive = movements.map(function (mov, i, arr) {
//   return `Movement ${i}: YOU ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;

//   //   if (mov > 0) {
//   //     return `Movement ${i}: You deposited ${mov}`;
//   //   } else {
//   //     return`Movement ${i}: YOU withdrew ${Math.abs(mov)}`;
//   //   }
// });
// console.log(movementsDescriptive);

///////////////////////////////////////
// filter method

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// // same using for loop
// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     depositsFor.push(mov);
//   }
// }
// console.log(depositsFor);

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdrawals);

///////////////////////////////////////
// reduce method

// SUM
// const balance = movements.reduce(function (acc, mov, i, arr) {
//   console.log(`iteration${i}: ${acc}`);
//   return acc + mov;
// }, 0);
// console.log(balance);

// // same using for loop
// let sum = 0;
// for (const mov of movements) {
//   sum += mov;
// }
// console.log(sum);

// // MAXIMUM
// const max = movements.reduce(function (acc, arr) {
//   if (acc > arr) {
//     return acc;
//   } else {
//     return arr;
//   }
// }, movements[0]);
// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(function (age) {
//     if (age <= 2) {
//       return age * 2;
//     } else {
//       return 16 + age * 4;
//     }
//   });
//   const adults = humanAges.filter(function (age) {
//     return age > 18;
//   });
//   const average =
//     adults.reduce(function (acc, age) {
//       return acc + age;
//     }, 0) / adults.length;

//   // const average = adults.reduce(function (acc, age, i, arr) {
//   //   return acc + age / arr.length;
//   // }, 0);

//   console.log(humanAges);
//   console.log(adults);
//   // console.log(average);
//   return average;
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// // // calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

////////////////////////////////////////
// CHAINING METHOD
// const USDtoINR = 82;
// console.log(movements);
// // PIPELINE
// const totalDepositsINR = movements
//   .filter((mov) => mov > 0)
//   // .map((mov) => mov * USDtoINR)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * USDtoINR;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsINR);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/
// const calcAverageHumanAge = (ages) => {
//   const humanAge = ages
//     .map((age) => {
//       if (age <= 2) {
//         return age * 2;
//       } else {
//         return 16 + age * 4;
//       }
//     })
//     .filter((age) => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return humanAge;
// };
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

////////////////////////////////////////
// FIND METHOD
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);
