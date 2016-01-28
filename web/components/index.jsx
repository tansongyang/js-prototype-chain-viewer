'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './editor.jsx';
import evaluateJS from '../../lib/evaluate';
import sampleCode from '../scripts/samples';

var outputContent;

document.addEventListener('DOMContentLoaded', () => {
  outputContent = document.getElementById('output-content');

  const editor =
    ReactDOM.render(<Editor />, document.getElementById('code-wrapper'));
  editor.setValue(sampleCode);

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
  appendPrototypeNode(result.object.id, ['prototype'], 'root-object');

  // Walk prototype chain
  for (let prototypeLink of result.chain) {
    if (prototypeLink.object === result.object) {
      continue; // Root object has already been handled
    }

    prototype = prototypeLink.object;

    if (prototype === Object.prototype) {
      // Reached the end, which is Object.prototype
      appendPrototypeNode('Object.prototype', ['prototype'], 'object-prototype');
      break;
    }

    constructor = result.constructors.filter(prototypeIsContructorPrototype)[0];
    if (constructor) {
      // This prototype is a constructor's prototype
      appendPrototypeNode(constructor.name, ['constructor'], constructor.name, true);
    } else {
      // This prototype is just an object
      appendPrototypeNode(prototype.id, ['prototype']);
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

function appendPrototypeNode(text, classList, id, isConstructor) {
  var div = document.createElement('div'),
    innerDiv;

  if (isConstructor) {
    // Group constructor and constructor,prototype together
    div.classList.add('constructor-prototype-wrapper');

    innerDiv = getPrototypeNode(id + '.prototype', ['prototype', 'constructor-prototype']);
    div.appendChild(innerDiv);

    innerDiv = getPrototypeNode(id, ['constructor']);
    div.appendChild(innerDiv);
  } else {
    div = getPrototypeNode(text, classList, id);
  }

  outputContent.appendChild(div);
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

  div.addEventListener('click', () => {
    if (div.classList.contains('is-active')) {
      div.classList.remove('is-active');
    } else {
      div.classList.add('is-active');
    }
  });

  return div;
}