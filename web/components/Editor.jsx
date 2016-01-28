'use strict';

import React from 'react';
import CodeMirror from 'codemirror';
// Used with CodeMirror
import '../../node_modules/codemirror/mode/javascript/javascript.js';

const Editor = React.createClass({
  // Better to have this interact with the browser instead of `render`;
  // see https://facebook.github.io/react/docs/component-specs.html#render
  componentDidMount() {
    this._codeMirror = CodeMirror.fromTextArea(this._textarea, { theme: 'monokai' });
  },
  getValue() {
    return this._codeMirror.getDoc().getValue();
  },
  // See https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
  render() {
    return (<div>
      <textarea ref={textarea => this._textarea = textarea} />
    </div>);
  },
  setValue(content) {
    this._codeMirror.getDoc().setValue(content);
  }
});

export default Editor;