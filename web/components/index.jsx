'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor.jsx';
import PropertiesWindow from './PropertiesWindow.jsx';
import evaluateJS from '../../lib/evaluate';

var outputContent, propertiesWindow;

document.addEventListener('DOMContentLoaded', () => {
  outputContent = document.getElementById('output-content');

  const editor =
    ReactDOM.render(<Editor />, document.getElementById('code-wrapper'));
  propertiesWindow =
    ReactDOM.render(<PropertiesWindow />, document.getElementById('properties-window'));

  document.getElementById('run').addEventListener('click', () => {
    const exports = evaluateJS(editor.getValue());
    display(exports);
  });

  document.getElementById('code-wrapper').classList.remove('is-uninitialized');
});

function display(result) {
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
  appendPrototypeNode(result.object, result.object.id, ['prototype'], 'root-object');

  // Walk prototype chain
  for (let prototypeLink of result.chain) {
    if (prototypeLink.object === result.object) {
      continue; // Root object has already been handled
    }

    prototype = prototypeLink.object;

    if (prototype === Object.prototype) {
      // Reached the end, which is Object.prototype
      appendPrototypeNode(prototype, 'Object.prototype', ['prototype'], 'object-prototype');
      break;
    }

    constructor = result.constructors.filter(prototypeIsContructorPrototype)[0];
    if (constructor) {
      // This prototype is a constructor's prototype
      appendPrototypeNode(constructor, constructor.name, ['constructor'], constructor.name, true);
    } else {
      // This prototype is just an object
      appendPrototypeNode(prototype, prototype.id, ['prototype']);
    }
  }

  // Display all nodes; temporary hack using setTimeout and hardcoded delay
  nodes = document.querySelectorAll('.output-div');
  i = 0;
  setTimeout(function removeHidden() {
    if (i < nodes.length) {
      nodes[i].classList.remove('is-hidden');
      i++;
      setTimeout(removeHidden, 200);
    }
  }, 200);
}

function appendPrototypeNode(object, text, classList, id, isConstructor) {
  var div = isConstructor ?
    getPrototypeNode(id + '.prototype', ['prototype', 'constructor-prototype']) :
    getPrototypeNode(text, classList, id);

  outputContent.appendChild(div);

  div.addEventListener('click', () => {
    propertiesWindow.display(object);
  })
}

function getPrototypeNode(text, classList, id) {
  var div = document.createElement('div');
  var i;

  if (text) {
    div.innerHTML = '<span class="output-div-text">' + text + '</span>';
  }
  div.classList.add('output-div');
  div.classList.add('is-hidden');
  if (classList && classList.length >= 0) {
    for (i = 0; i < classList.length; i++) {
      div.classList.add(classList[i]);
    }
  }
  if (id) {
    div.id = id;
  }

  return div;
}