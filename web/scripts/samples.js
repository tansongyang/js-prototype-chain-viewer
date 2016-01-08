'use strict';

const code = "function Foo(id) { this.id = id };" +
  "\r\nvar foo = new Foo('foo');" +
  "\r\nvar bar = Object.create(foo);" +
  "\r\nbar.id = 'bar';" +
  "\r\nexports.object = bar;" +
  "\r\nexports.constructors = [Foo];";
export default code;