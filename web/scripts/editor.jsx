'use strict';

import React from 'react';
import CodeMirror from 'codemirror';
// Used with CodeMirror
import '../../node_modules/codemirror/mode/javascript/javascript.js';

const Editor = React.createClass({
  render: function() {
    return (<div>
      <textarea ref={
        function (textarea) {
          CodeMirror.fromTextArea(textarea, { theme: 'monokai' });
        }
      } />
    </div>);
  }
});

export default Editor;