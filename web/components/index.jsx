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
    propertiesWindow.clear();
    const exports = evaluateJS(editor.getValue());
    display(exports);
  });

  document.getElementById('code-wrapper').classList.remove('is-uninitialized');
});

function display(result) {
  // Clear original
  while (outputContent.firstChild) {
    outputContent.removeChild(outputContent.firstChild);
  }

  // Walk prototype chain
  for (let link of result.chain) {
    if (link.object === result.object) {
      // Append root object
      appendPrototypeNode(link, ['prototype'], 'root-object');
      continue;
    }

    if (link.object === Object.prototype) {
      // Reached the end, which is Object.prototype
      appendPrototypeNode(link, ['prototype'], 'object-prototype');
      break;
    }

    let constructor =
      result.constructors.filter(c => link.object === c.prototype)[0];
    if (constructor) {
      // This prototype is a constructor's prototype
      appendPrototypeNode(link, ['constructor'], constructor.name, true);
    } else {
      // This prototype is just an object
      appendPrototypeNode(link, ['prototype']);
    }
  }

  // Display all nodes; temporary hack using setTimeout and hardcoded delay
  const nodes = document.querySelectorAll('.output-div');
  let i = 0;
  setTimeout(function removeHidden() {
    if (i < nodes.length) {
      nodes[i].classList.remove('is-hidden');
      i++;
      setTimeout(removeHidden, 200);
    }
  }, 200);
}

function appendPrototypeNode(link, classList, id, isConstructor) {
  const div = isConstructor ?
    getPrototypeNode(id + '.prototype', ['prototype', 'constructor-prototype']) :
    getPrototypeNode(link.name, classList, id);

  outputContent.appendChild(div);

  div.addEventListener('click', () => {
    propertiesWindow.display(link);
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