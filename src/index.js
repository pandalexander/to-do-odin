import "./style.css";
import buildProject from "./build-project.js";

buildProject();

// This commented-out code was meant to test the setup of various modules:

// import _ from "lodash";
// import printMe from "./print.js";
// import { compareAsc, format } from "date-fns";

// format(new Date(2014, 1, 11), "yyyy-MM-dd");
// //=> '2014-02-11'

// const dates = [
//   new Date(1995, 6, 2),
//   new Date(1987, 1, 11),
//   new Date(1989, 6, 10),
// ];
// dates.sort(compareAsc);
// //=> [
// //   Wed Feb 11 1987 00:00:00,
// //   Mon Jul 10 1989 00:00:00,
// //   Sun Jul 02 1995 00:00:00
// // ]

// console.log(dates[0]);

// function component() {
//   const element = document.createElement("div");
//   const btn = document.createElement("button");

//   // Lodash, now imported by this script
//   element.innerHTML = _.join(["Hello", "webpack"], " ");
//   element.classList.add("hello");

//   btn.innerHTML = "Click me and check the console!";
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   return element;
// }

// document.body.appendChild(component());
