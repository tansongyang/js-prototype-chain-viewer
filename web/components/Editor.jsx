'use strict';

import React from 'react';
import Codemirror from 'react-codemirror';
// Used with CodeMirror
import 'codemirror/mode/javascript/javascript';

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
  getInitialState() {
    return {
      code: sampleCode
    };
  },
  getValue() {
    return this._reactCodemirror.getCodeMirror().getDoc().getValue();
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode
    });
  },
  // See https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
  render() {
    const options = {
      lineNumbers: true,
      tabSize: 2,
      theme: 'monokai'
    };
    return (
      <div>
        <Codemirror
          ref={ref => this._reactCodemirror = ref}
          value={this.state.code}
          options={options}
          onChange={this.updateCode} />
      </div>
    );
  }
});

export default Editor;