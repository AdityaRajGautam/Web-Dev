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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = " ";
  // console.log(containerMovements.innerHTML);

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

// DISPLAY SUMMARY
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₨${income}`;
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₨${out}`;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int > 1;
    })
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `₨${interest}`;
};

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

// UPDATE UI
const updateUI = function (acc) {
  // DISPLAY MOVEMENTS
  displayMovements(acc.movements);

  // DISPLAY BALANCE
  calcDisplayBalance(acc);

  // DISPLAY SUMMARY
  calcDisplaySummary(acc);
};

// DISPLAY BALANCE
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return (acc += mov);
  }, 0);
  labelBalance.textContent = `₨${acc.balance}`;
};

// CREATE HANDLER
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  // PREVENTING FORM FROM SUBMITTING
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    //CLEAR INPUT FIELD
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    // DISPLAY UI AND MESSAGE
    labelWelcome.textContent = `Welcome Back! ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // update UI
    updateUI(currentAccount);
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "You Entered Wrong Pin";
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
  }
});

// MONEY TRANSFER
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName &&
    receiverAcc
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // UPDATE UI
    updateUI(currentAccount);
  }
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => amount >= mov * 0.1)
  ) {
    // add movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const confirmUser = inputCloseUsername.value;
  const confirmPIn = Number(inputClosePin.value);

  if (
    confirmUser === currentAccount.userName &&
    confirmPIn === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    inputCloseUsername.value = inputClosePin.value = "";
    // console.log(index);

    // DELETE ACCOUNT
    accounts.splice(index, 1);

    // HIDE UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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
// const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

////////////////////////////////////////
// SOME METHOD
// console.log(movements);
// // equality
// console.log(movements.includes(-130));

// // Some:condition
// console.log(movements.some((mov) => mov > 1500));

// // Every method
// console.log(movements.every((mov) => mov > 0));
// console.log(account4.movements.every((mov) => mov > 0));

// // seperate callbacks
// const deposit = (mov) => mov > 0;
// console.log(movements.every(deposit));
// console.log(movements.some(deposit));
// console.log(movements.filter(deposit));

// FLAT AND FLATMAP METHOD
// const arr = [[1, 2], 4, 5, [6, 7, 8]];
// console.log(arr.flat());

// const arrDeep = [[1, [2]], 4, 5, [[6, 7], 8]];
// console.log(arrDeep.flat());
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// FLAT
// const overallBalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance);

// // FLATMAP
// const overallBalance2 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance2);

/////////////////////////////////
// sorting

// string
// const arr = ["a", "v", "r", "z"];
// console.log(arr.sort());
// console.log(arr);

// // numbers
// console.log(movements);

// // return > 0,b,a(switch order)
// // return < 0 ,a,b(keep order)

// // ascending
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });
// movements.sort((a, b) => a - b);
// console.log(movements);

// // descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

////////////////////////////////////////
// other array methods
// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8));

// // empty arrays +fill method
// const x = new Array(7);
// console.log(x);
// // console.log(x.map(() => 5));
// // x.fill(1);
// x.fill(1, 3, 5);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener("click", function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll(".movements__value"),
//     (el) => Number(el.textContent.replace("₨", ""))
//   );

//   console.log(movementsUI);

//   const movementsUI2 = [...document.querySelectorAll(".movements__value")];
//   console.log(movementsUI2);
// });

/////////////////////////////////////////
// ARRAY MEYHODS PRACTICE

// 1.
// const bankDepositSum = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov > 0)
//   .reduce((acc, curr) => acc + curr, 0);

// console.log(bankDepositSum);

// // 2.
// // const numDepositSum1000 = accounts
// //   .flatMap((acc) => acc.movements)
// //   .filter((mov) => mov >= 1000).length;

// const numDepositSum1000 = accounts
//   .flatMap((acc) => acc.movements)
//   // .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);
//   .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

// console.log(numDepositSum1000);

// // prefix and postfix operator
// let a = 10;
// console.log(a++);
// console.log(a);
// let b = 12;
// console.log(++b);
// console.log(b);

// // 3.
// const sums = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sum, curr) => {
//       curr >= 0 ? (sum.deposits += curr) : (sum.withdrawls += curr);
//       return sum;
//     },
//     { deposits: 0, withdrawls: 0 }
//   );
// console.log(sums);

// // 4.
// const convertToTitleCase = function (title) {
//   const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

//   const tileCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(" ");
//   return capitalize(tileCase);
// };

// console.log(convertToTitleCase("this is a nice title"));
// console.log(convertToTitleCase("this is a LONG title but not to long"));
// console.log(convertToTitleCase("and here is another title with an EXAMPLE"));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1.
dogs.forEach((dog) => (dog.recFood = dog.weight ** 0.75 * 28));

// 2.
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little`);

// 5.
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6.
//  current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = (dog) =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
const dogSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogSorted);
