"use strict";

import parser from "./parser"; // Babel requires './' as of this writing.

var sampleCode = "function Foo(id) { this.id = id };" +
  "\r\nvar foo = new Foo('foo');" +
  "\r\nvar bar = Object.create(foo);" +
  "\r\nbar.id = 'bar';" +
  "\r\nexports.object = bar;" +
  "\r\nexports.constructors = [Foo];";
var codeArea, outputContent;

document.addEventListener("DOMContentLoaded", () => {
  codeArea = document.getElementById("code");
  outputContent = document.getElementById("output-content");

  document.getElementById("run").addEventListener("click", () => {
    codeArea.value = codeArea.value || sampleCode;
    var exports = parser.parse(codeArea.value || sampleCode);
    display(exports);
  });

  document.getElementById("code-wrapper").classList.remove("is-uninitialized");
});

function display(exports) {
  var prototype, constructor, nodes, i;

  // Predicate for checking if prototype is a constructor prototype
  function prototypeIsContructorPrototype(constructor) {
    return prototype === constructor.prototype;
  }

  // Clear original
  while (outputContent.firstChild) {
    outputContent.removeChild(outputContent.firstChild);
  }

  // Append root object
  appendPrototypeNode(exports.object.id, ["prototype"], "root-object");

  // Walk prototype chain
  for (prototype = Object.getPrototypeOf(exports.object); prototype; prototype = Object.getPrototypeOf(prototype)) {
    if (prototype === Object.prototype) {
      // Reached the end, which is Object.prototype
      appendPrototypeNode("Object.prototype", ["prototype"], "object-prototype");
      break;
    }

    constructor = exports.constructors.filter(prototypeIsContructorPrototype)[0];
    if (constructor) {
      // This prototype is a constructor's prototype
      appendPrototypeNode(constructor.name, ["constructor"], constructor.name, true);
    } else {
      // This prototype is just an object
      appendPrototypeNode(prototype.id, ["prototype"]);
    }
  }

  // Display all nodes; temporary hack using setTimeout and hardcoded delay
  nodes = document.querySelectorAll(".output-div");
  i = 0;
  setTimeout(function removeHidden() {
    if (i < nodes.length) {
      nodes[i].classList.remove("is-hidden");
      i++;
      setTimeout(removeHidden, 200);
    }
  }, 200);
}

function appendPrototypeNode(text, classList, id, isConstructor) {
  var div = document.createElement("div"),
    innerDiv;

  if (isConstructor) {
    // Group constructor and constructor,prototype together
    div.classList.add("constructor-prototype-wrapper");

    innerDiv = getPrototypeNode(id + ".prototype", ["prototype", "constructor-prototype"]);
    div.appendChild(innerDiv);

    innerDiv = getPrototypeNode(id, ["constructor"]);
    div.appendChild(innerDiv);
  } else {
    div = getPrototypeNode(text, classList, id);
  }

  outputContent.appendChild(div);
}

function getPrototypeNode(text, classList, id) {
  var div = document.createElement("div");
  var i;

  if (text) {
    div.innerHTML = '<span class="output-div-text">' + text + "</span>";
  }
  div.classList.add("output-div");
  div.classList.add("is-hidden");
  if (classList && classList.length >= 0) {
    for (i = 0; i < classList.length; i++) {
      div.classList.add(classList[i]);
    }
  }
  if (id) {
    div.id = id;
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("is-active")) {
      div.classList.remove("is-active");
    } else {
      div.classList.add("is-active");
    }
  });

  return div;
}