const _ = require("lodash");

// Your custom groupBy polyfill function
function groupBy(collection, property) {
  const output = {};

  if (!collection || typeof collection !== "object") {
    return output;
  }

  const isPropertyFunction = typeof property === "function";
  const isPropertyPath = typeof property === "string";

  for (const value of Object.values(collection)) {
    let current = "undefined";
    if (isPropertyFunction) {
      current = property(value);
    } else if (isPropertyPath) {
      const items = property.split(".");
      let currentItem = value;
      let currentKey;

      for (let i = 0; i < items.length; i++) {
        currentKey = items[i];

        if (!currentItem[currentKey]) {
          currentItem = "undefined";
          break;
        }
        currentItem = currentItem[currentKey];
      }

      current = currentItem;
    }

    output[current] = output[current] || [];
    output[current].push(value);
  }

  return output;
}

// Testing with Lodash's groupBy function
const sampleData = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "John", age: 40 },
];

console.log("Lodash groupBy:", _.groupBy(sampleData, "name"));
console.log("Custom groupBy:", groupBy(sampleData, "name"));
