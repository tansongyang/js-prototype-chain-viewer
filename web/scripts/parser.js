'use strict';

/**
 * Parses the code as JavaScript.
 * Assumes that the code assigns to the `exports` object.
 * @param  {String} code The code to run.
 * @return {Object} The exports object from the code.
 */
export default function parse(code) {
  if (!code) {
    throw 'ArgumentException: "code" is null or undefined.';
  }

  /* jslint evil: true*/
  // This is part of required functionality
  let evaluate = new Function('exports', code);
  let exports = {};
  evaluate(exports);

  // Assume users will put base object in exports.object
  // and constructors in exports.constructors

  exports.constructors = exports.constructors || [];
  exports.constructors = exports.constructors.concat([
    Function,
    Array
  ]); // Include fundamental objects

  return exports;
}
