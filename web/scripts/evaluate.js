'use strict';

/**
 * Evaluates the code as JavaScript.
 * Code should return the following object:
 * {
 *   object: Object
 *   constructors: Function[]
 * }
 * @param  {String} code The code to run.
 * @return {Object} The exports object from the code.
 */
export default function evaluateJS(code) {
  if (!code) {
    throw 'ArgumentException: "code" is null or undefined.';
  }

  /* jslint evil: true*/
  // This is part of required functionality
  let evaluate = new Function(code);
  let result = evaluate(result);
  result.constructors = result.constructors || [];

  // Include fundamental objects
  result.constructors = result.constructors.concat([
    Function,
    Array
  ]);

  return result;
}
