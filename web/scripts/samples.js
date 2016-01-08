'use strict';

const code = `/* Sample code */

// A class with a single property 'id'.
// Give the objects in your prototype chain an 'id' property for easier display.
function Foo(id) {
  this.id = id;
}

// Create a new Foo with id = 'food'.
var foo = new Foo('foo');

// Create an object whose prototype is foo.
var bar = Object.create(foo);
bar.id = 'bar';

// Always return an object of this form:
return {
  // The object whose prototype chain you want to examine.
  object: bar,
  // The custom constructor functions you used.
  constructors: [Foo]
};
`
export default code;