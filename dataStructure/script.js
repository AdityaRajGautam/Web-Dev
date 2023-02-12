"use strict";
// console.log(globalThis);

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  Name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // ES6 enhancement object literal
  openingHours,
  orderDilevery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time} `
    );
    console.log(address);
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `here is your delicious pasta with ${ing1},${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIng, ...otherIng) {
    console.log(mainIng);
    console.log(otherIng);
  },
};

///////////////////////////////////////
// String Methods Practice

// outputs
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// for (const flight of flights.split("+")) {
//   const [type, from, to, time] = flight.split(";");
//   const output = `${type.startsWith("_Delayed") ? "🔴" : " "}${type.replaceAll(
//     "_",
//     " "
//   )} from ${from.toUpperCase().slice(0, 3)} to ${to
//     .toUpperCase()
//     .slice(0, 3)} (${time.replace(":", "h")})`.padStart(44);
//   console.log(output);
// }

///////////////////////////////////////
// Coding Challenge #4

// inputs
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// document.body.append(document.createElement("textarea"));
// document.body.append(document.createElement("button"));
// document.querySelector("button").addEventListener("click", function () {
//   const text = document.querySelector("textarea").value;
//   const rows = text.split("\n");

//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split("_");
//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${"✅".repeat(i + 1)}`);
//   }
// });

///////////////////////////////////////
// Working With Strings - Part 3

// Split and Join
// console.log("a+very+nice+string".split("+"));
// console.log("Aditya Raj Gautam".split(" "));
// const [firstname, , lastname] = "Aditya Raj Gautam".split(" ");
// console.log(firstname, lastname);
// const newName = ["Mr.", firstname, lastname.toUpperCase()].join(" ");
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(" ");
//   const nameUpper = [];
//   for (const n of names) {
//     // nameUpper.push(n[0].toUpperCase() + n.slice(1));
//     nameUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(nameUpper.join(" "));
// };

// capitalizeName("aditya raj gautam");

// // Padding
// const message = "Go to gate 23!";
// console.log(message.padStart(20, "+").padEnd(30, "+"));
// console.log("Aditya".padStart(20, "+").padEnd(30, "+"));

// const maskCreditCard = function (number) {
//   const str = number + "";
//   const last = str.slice(-4);

//   return last.padStart(str.length, "*");
// };
// console.log(maskCreditCard(763435763));

// repeat
// const message2 = "bad weather... all planes are delayed... ";
// console.log(message2.repeat(5));

// const planeInLine = function (n) {
//   console.log(`there are ${n} in line ${"✈️".repeat(n)}`);
// };
// planeInLine(5);

///////////////////////////////////////
// Working With Strings - Part 2
// const airline = "TAP Air Portugal";
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// //Fix capitalization in a string
// const passanger = "aDitYA";
// const lowerPassanger = passanger.toLowerCase();
// console.log(lowerPassanger[0].toUpperCase() + lowerPassanger.slice(1));

// // Comparing emails
// const email = "hello@aditya.io";
// const loginEmail = "  Hello@Aditya.Io \n";
// const normalizedEmail = loginEmail.toLocaleLowerCase().trim();
// console.log(normalizedEmail);
// console.log(normalizedEmail === email);

// // replace
// const priceGB = "234,78£";
// const priceIND = priceGB.replace("£", "₹").replace(",", ".");
// console.log(priceIND);
// const announcement =
//   "all passenger come to boarding door 23, boarding door 23!";
// console.log(announcement.replace("door", "gate"));

// console.log(announcement.replace(/door/g, "gate"));

// // Booleans
// const plane = "Airbus A320neo";
// console.log(plane.includes("A320"));
// console.log(plane.includes("Boeing"));
// console.log(plane.startsWith("Airb"));
// if (plane.startsWith("Airbus") && plane.endsWith("neo")) {
//   console.log("Part of the NEW ARirbus family");
// }

// // Practice exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes("knife") || baggage.includes("gun")) {
//     console.log("You are NOT allowed on board");
//   } else {
//     console.log("Welcome aboard!");
//   }
// };
// checkBaggage("I have a laptop, some Food and a pocket Knife");
// checkBaggage("Socks and camera");
// checkBaggage("Got some snacks and a gun for protection");

///////////////////////////////////////
// Working With Strings - Part 1
// const airline = "TAP Air Portugal";
// const plane = "A320";
// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log("B737"[0]);
// console.log(airline.length);
// console.log("B737".length);
// console.log(airline.indexOf("r"));
// console.log(airline.lastIndexOf("r"));
// console.log(airline.indexOf("portugal"));
// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));
// console.log(airline.slice(0, airline.indexOf(" ")));
// console.log(airline.slice(airline.lastIndexOf(" ") + 1));
// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));
// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === "B" || s === "E") console.log("You got the middle seat 😬");
//   else console.log("You got lucky 😎");
// };
// checkMiddleSeat("11B");
// checkMiddleSeat("23C");
// checkMiddleSeat("3E");
// console.log(new String("aditya"));
// console.log(typeof new String("aditya"));
// console.log(typeof new String("aditya").slice(1));

///////////////////////////////////////
// Coding Challenge #3
// const gameEvents = new Map([
//   [17, "⚽️ GOAL"],
//   [36, "🔁 Substitution"],
//   [47, "⚽️ GOAL"],
//   [61, "🔁 Substitution"],
//   [64, "🔶 Yellow card"],
//   [69, "🔴 Red card"],
//   [70, "🔁 Substitution"],
//   [72, "🔁 Substitution"],
//   [76, "⚽️ GOAL"],
//   [80, "⚽️ GOAL"],
//   [92, "🔶 Yellow card"],
// ]);

// // 1)
// const events = new Set([...gameEvents.values()]);
// console.log(events);

// //  2)
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3)
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );
// // alternate
// const time = [...gameEvents.keys()].pop();
// console.log(time);
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// // 4)

// for (const [key, value] of gameEvents) {
//   if (key > 45) {
//     console.log(`[SECOND HALF] ${key}: ${value}`);
//   } else {
//     console.log(`[FIRST HALF] ${key}: ${value}`);
//   }
// }
// // alternate
// for (const [key, value] of gameEvents) {
//   const half = key <= 45 ? "FIRST" : "SECOND";
//   console.log(`[${half} HALF] ${key}: ${value}`);
// }

///////////////////////////////////////
// Map:iteration
// const question = new Map([
//   ["question", "Which is the best programming language?"],
//   [1, "c++"],
//   [2, "java"],
//   [3, "python"],
//   [4, "javascript"],
//   ["correct", 4],
//   [true, "correct"],
//   [false, "try again!"],
// ]);
// console.log(question);

// // convert object to map
// console.log(Object.entries(openingHours));
// const hourMap = new Map(Object.entries(openingHours));
// console.log(hourMap);

// // quiz app
// console.log(question.get("question"));
// for (const [key, value] of question) {
//   if (typeof key === "number") {
//     console.log(`optinon${key}: ${value}`);
//   }
// }
// const answer = 3;
// // const answer = Number(prompt("answer"));
// // if (answer === question.get("correct")) {
// //   console.log(question.get(true));
// // } else {
// //   console.log(question.get(false));
// // }
// // alternante
// console.log(question.get(question.get("correct") === answer));

// // convert to array
// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

///////////////////////////////////////
// MAP:fundamentals
// const rest = new Map();
// rest.set("name", "classico italiano");
// rest.set(1, "Firenze,Italy");
// console.log(rest.set(2, "Lisbon,Portugal"));
// rest
//   .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
//   .set("open", 11)
//   .set("close", 23)
//   .set(true, "We are open")
//   .set(false, "We are closed");

// console.log(rest.get("name"));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 21;

// console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// console.log(rest.has("categories"));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// // rest.clear();
// console.log(rest);

// const arr = [1, 2];
// rest.set(arr, "test");
// rest.set(document.querySelector("h1"), "heading");
// console.log(rest.get(arr));
// console.log(rest);

///////////////////////////////////////
// SETS
// const orderedSet = new Set(["paneer", "chicken", "chicken", "paneer", "chaap"]);
// console.log(orderedSet);

// console.log(new Set("aditya"));

// console.log(orderedSet.size);

// console.log(orderedSet.has("pizza"));
// console.log(orderedSet.has("chicken"));

// orderedSet.add("pizza");
// orderedSet.delete("chaap");
// // orderedSet.clear();
// console.log(orderedSet);

// for (const order of orderedSet) console.log(order);

// // EXAMPLE
// const staff = ["waiter", "chef", "waiter", "manager", "chef", "waiter"];
// const uniqueStaff = [...new Set(staff)];
// console.log(uniqueStaff);

// console.log(
//   new Set(["waiter", "chef", "waiter", "manager", "chef", "waiter"]).size
// );

// console.log(new Set("adityarajgautam").size);

///////////////////////////////////////
// Coding Challenge #2

// const game = {
//   team1: "Bayern Munich",
//   team2: "Borrussia Dortmund",
//   players: [
//     [
//       "Neuer",
//       "Pavard",
//       "Martinez",
//       "Alaba",
//       "Davies",
//       "Kimmich",
//       "Goretzka",
//       "Coman",
//       "Muller",
//       "Gnarby",
//       "Lewandowski",
//     ],
//     [
//       "Burki",
//       "Schulz",
//       "Hummels",
//       "Akanji",
//       "Hakimi",
//       "Weigl",
//       "Witsel",
//       "Hazard",
//       "Brandt",
//       "Sancho",
//       "Gotze",
//     ],
//   ],
//   score: "4:0",
//   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
//   date: "Nov 9th, 2037",
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1)
// for (const [score, name] of game.scored.entries()) {
//   console.log(`Goal ${score}: ${name}`);
// }

// // 2)
// let average = 0;
// for (const odd of Object.values(game.odds)) {
//   average += odd;
// }
// average /= Object.values(game.odds).length;
// console.log(average);

// // 3)
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamstr = team === "x" ? "draw" : `victory${game[team]}`;
//   console.log(`Odd of ${teamstr}: ${odd} `);
// }

// // 4)
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

///////////////////////////////////////
// Looping objects: object keys,values and entries

// //Property names
// const properties = Object.keys(openingHours);
// console.log(properties);
// let openStr = `We are open on ${properties.length} days:`;

// for (const days of properties) {
//   openStr += ` ${days}, `;
// }
// console.log(openStr);

// // Property values
// const values = Object.values(openingHours);
// console.log(values);

// // Property entries
// const entries = Object.entries(openingHours);
// console.log(entries);

// // [Key, Value]
// for (const [day, { open, close }] of entries) {
//   console.log(`On ${day} we open at ${open} nd close at ${close}`);
// }

// //////////////////////////////////////
// // Optional Chaining(?.)

// if (restaurant.openingHours && restaurant.openingHours.mon)
// console.log(restaurant.openingHours.mon.open);

// //With optional chaining
// console.log(restaurant.openingHours.sat?.open);
// console.log(restaurant.openingHours?.thu?.open);
// console.log(restaurant.openingHours?.mon?.open);

// // example
// const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// for (const day of days) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? "closed";
//   console.log(`On ${day}, we open at ${open}`);
// }

// // methods
// console.log(restaurant.order?.(0, 2) ?? "method does not exists");
// console.log(restaurant.orderrissoto?.(0, 2) ?? "method does not exists");

// // Arrays
// const users = [
//   {
//     name: "aditya",
//     email: "404arg@gmail.com",
//   },
// ];
// console.log(users[0]?.name ?? "Array is empty");

// if (users.length > 0) console.log(users[0].name);
// else console.log("array is emppty");

// ///////////////////////////////////////
// // The for-of loop

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// // for (const item of menu.entries()) console.log(`${item[0] + 1}: ${item[1]}`);
// for (const [i, el] of menu.entries()) console.log(`${i + 1}: ${el}`);

// console.log([...menu.entries()]);

// ///////////////////////////////////////
// // Coding Challenge #1

// const game = {
//   team1: "Bayern Munich",
//   team2: "Borrussia Dortmund",
//   players: [
//     [
//       "Neuer",
//       "Pavard",
//       "Martinez",
//       "Alaba",
//       "Davies",
//       "Kimmich",
//       "Goretzka",
//       "Coman",
//       "Muller",
//       "Gnarby",
//       "Lewandowski",
//     ],
//     [
//       "Burki",
//       "Schulz",
//       "Hummels",
//       "Akanji",
//       "Hakimi",
//       "Weigl",
//       "Witsel",
//       "Hazard",
//       "Brandt",
//       "Sancho",
//       "Gotze",
//     ],
//   ],
//   score: "4:0",
//   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
//   date: "Nov 9th, 2037",
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// //  1)
// const [player1, player2] = game.players;
// console.log(player1, player2);

// //  2)
// const [gk, ...fieldplayers] = player1;
// console.log(gk, fieldplayers);

// //  3)
// const allplayers = [...player1, ...player2];
// console.log(allplayers);

// //  4)
// const players1Final = [...player1, "thiago", "'Coutinho", "Perisic"];
// console.log(players1Final);

// //  5)
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// //  6)
// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored`);
// };
// printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
// printGoals("Davies", "Muller");
// printGoals(...game.scored);

// //  7)
// team1 > team2 && console.log("team2 is more likely to win");
// team1 < team2 && console.log("team1 is more likely to win");

///////////////////////////////
// logical assignment operator
// const rest1 = {
//   name: "Sigma",
//   // numGuest: 20,
//   numGuest: 0,
// };
// const rest2 = {
//   name: "Alpha",
//   owner: "aditya",
// };
// // rest1.numGuest = rest1.numGuest || 10;
// // rest2.numGuest = rest2.numGuest || 10;

// // OR assignment operator
// // rest1.numGuest ||= 10;
// // rest2.numGuest ||= 10;

// // Nullish assignment operator(null or undefined)
// // rest1.numGuest ??= 10;
// // rest2.numGuest ??= 10;

// // rest1.owner = rest1.owner && "ANNONYMOUS";
// // rest2.owner = rest2.owner && "ANNONYMOUS";

// // AND assignment operator
// rest1.owner &&= "ANNONYMOUS";
// rest2.owner &&= "ANNONYMOUS";

// console.log(rest1);
// console.log(rest2);

// // ///////////////////////////////////
// // Nullish Operator(??)
// restaurant.numguest = 0;
// const guest = restaurant.numguest || 10;
// console.log(guest);

// // Nullish:null and undefined(NOT or "")
// const guestCorrect = restaurant.numguest ?? 10;
// console.log(guestCorrect);

// // ///////////////////////////////
// //Short Circuiting(&& and ||)
// //Use any datatype,return any data type,short circuiting
// console.log("----OR-----");
// console.log(3 || "aditya");
// console.log("" || "aditya");
// console.log(true || 0);
// console.log(undefined || null);

// // restaurant.numGuest = 23;
// const guest1 = restaurant.numGuest ? restaurant.numGuest : 10;
// console.log(guest1);

// const guest2 = restaurant.numGuest || 10;
// console.log(guest2);

// console.log("---AND---");
// console.log(0 && "aditya");
// console.log(7 && "aditya");
// console.log("hello" && 23 && null && "aditya");

// // practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza("paneer", "onion");
// }

// restaurant.orderPizza && restaurant.orderPizza("paneer", "onion");

// // ////////////////////////////
// // Rest Patterns and Parameters

// // 1)destructuring
// // SPREAD,because on the right side of =
// const arr = [1, 2, ...[3, 4]];

// // REST,because on the left side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherfood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherfood);

// // objects
// const { fri, ...weekdays } = restaurant.openingHours;

// console.log(fri, weekdays);

// // 1)functions
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(1, 5, 3, 7);
// add(6, 4, 7, 2, 4, 9);

// const x = [2, 5, 8];
// add(...x);

// restaurant.orderPizza("paneer", "olive", "capcicum", "chicken");
// restaurant.orderPizza("paneer");

// ////////////////////////////
// // SPREAD OPERATOR(...)
// const arr = [7, 8, 9];
// const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArray);
// const newArray = [1, 2, ...arr];
// console.log(newArray);
// console.log(1, 2, arr);
// console.log(...newArray);
// console.log(newArray);

// const newMenu = [...restaurant.mainMenu, "chicken"];
// console.log(newMenu);

// // copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// //join 2 or more arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// // objects are not iterables
// const str = "aditya";
// const letters = [...str, " ", "r", "a','j"];
// console.log(letters);
// // console.log(`${...str,}`,raj);

// // real world example
// const ingridient = [
//   //   prompt("lets make pasta! ingridient1"),
//   //   prompt("ingridient2"),
//   //   prompt("ingridient3"),
// ];

// restaurant.orderPasta(...ingridient);

// // objects
// const newObject = {
//   foundedIn: 1991,
//   ...restaurant,
//   founder: "aditya",
// };
// console.log(newObject);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.Name = "myRestaurant";
// console.log(restaurantCopy.Name);
// console.log(restaurant.Name);

/*
////////////////////////////
// DESTRUCTURING OBJECTS
restaurant.orderDilevery({
  time: "22:30",
  address: "sanjay colony",
  starterIndex: 2,
  mainIndex: 2,
});
restaurant.orderDilevery({
  address: "sanjay colony",
  starterIndex: 1,
});

const { Name, openingHours, categories } = restaurant;
console.log(Name, openingHours, categories);

const {
  Name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variables
let a = 111;
let b = 222;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// nested object;
const {
  sat: { open: o, close: c },
} = openingHours;
console.log(o, c);

/*
// ///////////////////////
// DESTRUCTURING ARRAYS
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switching variable
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// recieving two return values from function
const [starter, mainCourse] = restaurant.order(0, 2);
console.log(starter, mainCourse);

// nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values
const [p = 1, q = 1, r = 1] = [2, 5];
console.log(p, q, r);
*/
