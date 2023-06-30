const sayHello = (name) => {
  console.log(`Hello, ${name}! Have a nice day`);
};

const divideConsole = () => {
  console.log("");
  console.log("");
  console.log("");
};

// Non default export
module.exports.sayHello = sayHello;
module.exports.divideConsole = divideConsole;
