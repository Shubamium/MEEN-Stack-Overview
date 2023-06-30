// NPM FLAGS
// -g = Save it to the global/pc node modules not in this project
// -save-dev | -D = Save it as a dev dependencies meaning that it won't be included if you build

console.log("beloooo");
// Use NODEMON package for live reload of Node js code
// nodemon .

// [1] Globals Object  --- It's a singleton like window object in browser js
// console.log(global);
// global.setTimeout(() => console.log("logged"), 1000);  <---- The use of global is redundant you can just:
setTimeout(() => console.log("Logged"), 2000);
// Other stuff in globabl include the fetch & setInterval and if you're using jest, it'll add it and test to globals
//Properties in globals
console.log(__dirname);
console.log(__filename); // Get absolute path of this file

// document.querySelector <--- won't work since document is a web api

// [2] Modules (Common JS & ESModules)
// Common JS
const { sayHello, divideConsole } = require("./modules/mainModule");
sayHello("Brian");
divideConsole();
// import checkIn from "./modules/esmSample.mjs"; You can only use ESM Syntax on a module

// Node js has a few built in package that doesn't need to be installec like:
const os = require("os");
console.log(os.platform());
// console.log(os.uptime());
// console.log(os.networkInterfaces());

divideConsole();

// [3] Read and write Files
const fs = require("fs"); // File System module

// Read File
// Async with callback
fs.readFile("./other/hello.txt", (err, data) => {
  console.log("Reading File: " + data.toString());
});

// console.log("non blocking");

// Write File
fs.writeFile(
  "./other/programmatic.txt",
  "This is programmatically generated!",
  () => {
    console.log("File Written/Created");
  }
);

// Check if the folder/dir exists already
const dirExist = fs.existsSync("./docs");

// Make folder
!dirExist &&
  fs.mkdir("./docs", (err) => {
    err && console.log(err);
    console.log("folder created");
  });

// Delete the folder
dirExist &&
  fs.rmdir("./docs", (err) => {
    err & console.log(err);
  });

fs.existsSync("./other/deleteme.txt") &&
  fs.unlink("./other/deleteme.txt", (err) => {
    err & console.log(err);
  });

let spam = "";
for (let i = 0; i < 150000; i++) {
  spam +=
    "This Is a spam, You will be spammed so many many times, this messages will now repeat!";
}

//   Sync Create File:
fs.writeFileSync("./other/spam.txt", spam);
