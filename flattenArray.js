/**
 * A closure is a feature in JavaScript where an inner function has access to variables from its outer function's scope,
 * even after the outer function has completed execution.
 * This means the inner function retains references to variables in the outer function,
 * allowing them to be used and modified across multiple invocations.
 *
 *
 * In arrow functions, this does not behave the same way.
 * Arrow functions don't have their own this context; instead, they inherit this from the surrounding lexical scope.
 * This means that this is fixed at the time the arrow function is defined, based on where it was written in the code,
 * rather than being dynamically set at the time of invocation.
 */

const input = [1, 2, [3, 4, [10, 56], 5], [6, 7], 8];

// ITERATIVE METHOD1:
//Feasible only for 1st level nesting

function flattenArray() {
  let stack = [...this];
  const output = [];
  while (stack.length) {
    const lastElement = stack.pop();
    if (Array.isArray(lastElement)) {
      output.push(...lastElement);
    } else {
      output.push(lastElement);
    }
  }
  return output.reverse();
}

//ITERATIVE METHOD2:

function flattenArray1() {
  return this.toString()
    .split(",")
    .map((element) => Number(element));
}

//RECURSIVE METHOD1:

function flatten2() {
  const output = [];
  function flattenArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flattenArray(arr[i]);
      } else {
        output.push(arr[i]);
      }
    }
  }

  flattenArray(this);
  return output;
}

function flatten2WithDepth(depth) {
  const output = [];
  function flattenArray(arr, depth) {
    // [1,[3, 4, [10, 56], 5], [6, 7]]
    console.log("depth", arr, depth);
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth > 0) {
        //Important:We are not changing the value of depth but we are passing reduced depth in recursion
        flattenArray(arr[i], depth - 1);
      } else {
        output.push(arr[i]);
      }
    }
  }

  flattenArray(this, depth);
  return output;
}

function flattenArrayIteartiveWithDepth(depth) {
  const output = [];
  let stack = this.map((item) => ({ element: item, depth }));

  while (stack.length > 0) {
    const { element, depth } = stack.pop();
    if (Array.isArray(element) && depth > 0) {
      stack.push(
        ...element.map((item) => ({ element: item, depth: depth - 1 }))
      );
    } else {
      output.push(element);
    }
  }

  return output;
}

Array.prototype.flat = flattenArrayIteartiveWithDepth;
console.log(input.flat(1));
