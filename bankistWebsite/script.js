"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// BUTTON SCROLLING

btnScrollTo.addEventListener("click", function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());teri maa ki chut

  // console.log("Current Scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  // console.log(
  //   "height/witdth of viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// PAGE NAVIGATION
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // MATCHING STRATEGY
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// TABBED COMPONENT
const tab = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tab.forEach((t) => t.classList.remove("operations__tab--active"));

  // add active classes
  clicked.classList.add("operations__tab--active");

  // Activate content area
  console.log(clicked.dataset.tab);
  tabContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// MENU FADE ANNIMATION
const handleOver = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opactiy = opacity;
  }
};

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  handleOver(e, 0.5); //WE CAN ALSO USE BIND METHOD HERE CALL THE FUNCTION WHICH WILL HELP IN PASSING "ARGUMENTS" TO EVENT HANDLERS , THIS PROCESS WILL TAKE THE HELP OF THIS KEYWORD IN THE FUNCTION
});
nav.addEventListener("mouseout", function (e) {
  handleOver(e, 1); //SAME CAN BE DONE HERE
});

///////////////////////////////////////
// STICKY NAVIGATION
// const initialCords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

///////////////////////////////////////
// STICKY NAVIGATION:INTERSECTION OBSERVER API
// const onCallBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const ObsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(onCallBack, ObsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyObserver = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyObserver, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// REVEAL SECTION
const allSections = document.querySelectorAll(".section");
const sectionreveal = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionreveal, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

///////////////////////////////////////
// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //REPLACE SRC WITH DATA-SRC
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

// next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

// previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

///////////////////////////////////////
// Selecting, Creating, and Deleting Elements
// Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const header = document.querySelector(".header");
// // const allSections = document.querySelectorAll('.section');
// // console.log(allSections);
// // document.getElementById('section--1');
// // const allButtons = document.getElementsByTagName('button');
// // console.log(allButtons);
// // console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const message = document.createElement("div");
// message.classList.add("cookie-message");

// message.textContent =
//   "We use cookied for improved functionality and analytics.";
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message);

// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// // Delete elements
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//     message.parentElement.removeChild(message);
//   });

// ///////////////////////////////////////
// // Styles, Attributes and Classes

// // Styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";
// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// // ATTRIBUTE
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// logo.alt = "minimalist bankist";

// // NON-STANDARD
// console.log(logo.designer);
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "bankist");

// console.log(logo.src);
// console.log(logo.getAttribute("src"));

// // DATA ATTRIBUTE
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add("c", "j");
// logo.classList.remove("c", "j");
// logo.classList.toggle("c");
// logo.classList.contains("c"); // not includes

// // Don't use
// logo.clasName = "jonas";

///////////////////////////////////////
// Types of Events and Event Handlers
// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");

// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log("Current Scroll (X/Y)", window.pageXOffset, window.pageYOffset);
//   console.log(
//     "height/witdth of viewport",
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // Scrolling
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: "smooth",
//   // });

//   section1.scrollIntoView({ behavior: "smooth" });
// });

// const h1 = document.querySelector("h1");
// const alerth1 = function () {
//   alert("You are reading the heading");
//   h1.removeEventListener("mouseenter", alerth1);
// };

// h1.addEventListener("mouseenter", alerth1);

// // h1.onmouseenter = function () {
// //   alert("You are reading the heading");
// // };

///////////////////////////////////////
// Event Propagation in Practice
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// // console.log(randomColor());
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   // console.log("yes");
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // STOP PROPAGATION
//   // e.stopPropagation();    //NOT A GOOD PRACTICE
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   // console.log("yes");
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });
// document.querySelector(".nav").addEventListener("click", function (e) {
//   // console.log("yes");
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

///////////////////////////////////////
// DOM Traversing

// const h1 = document.querySelector("h1");

// // Going Downwards:Child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "red";

// // Going upwards:parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// // Going sideways:siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

////////////////////////////////
// LifeCycle DOM event

// document.addEventListener("DOMContentLoaded", function (e) {
//   console.log("DOMContentLoaded", e);
// });

// window.addEventListener("load", function (e) {
//   console.log("page fully loaded", e);
// });

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
// });
