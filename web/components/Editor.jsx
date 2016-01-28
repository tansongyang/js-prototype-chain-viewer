'use strict';

import React from 'react';
import CodeMirror from 'codemirror';
// Used with CodeMirror
import '../../node_modules/codemirror/mode/javascript/javascript.js';

const sampleCode = `/* Sample code */

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

const Editor = React.createClass({
  propTypes: {
    sampleCode: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      sampleCode: sampleCode
    }
  },
  // Better to have this interact with the browser instead of `render`;
  // see https://facebook.github.io/react/docs/component-specs.html#render
  componentDidMount() {
    this._codeMirror = CodeMirror.fromTextArea(this._textarea, { theme: 'monokai' });
  },
  getValue() {
    return this._codeMirror.getDoc().getValue();
  },
  setValue(content) {
    this._codeMirror.getDoc().setValue(content);
  },
  // See https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
  render() {
    return (
      <div>
        <textarea ref={textarea => this._textarea = textarea}>
          {this.props.sampleCode}
        </textarea>
      </div>
    );
  }
});

export default Editor;