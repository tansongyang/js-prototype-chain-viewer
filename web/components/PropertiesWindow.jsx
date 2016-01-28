'use strict';

import React from 'react';

const PropertiesWindow = React.createClass({
  getInitialState() {
    return {
      object: null
    }
  },
  display(object) {
    this.setState({ object });
  },
  render() {
    const object = this.state.object;
    let properties = [];
    if (object) {
      properties = Object.getOwnPropertyNames(object);
    }
    return (
      <div>
        <ul>
          {properties.map(property => {
            let propertyValue = object[property];
            propertyValue = propertyValue ? propertyValue.toString() : '';
            return (
              <li key={property}>{property}: {propertyValue}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});

export default PropertiesWindow;
