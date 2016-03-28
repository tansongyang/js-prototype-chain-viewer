import React from 'react';

const classPropertyName = 'property-name';

const PropertiesWindow = React.createClass({
  getInitialState() {
    return {
      link: null
    }
  },
  clear() {
    this.setState(this.getInitialState());
  },
  display(link) {
    this.setState({ link });
  },
  render() {
    const link = this.state.link;
    const properties = link ? link.getOwnPropertyNamesSafe() : [];
    return (
      <div>
        <ul>
          {properties.map(property => {
            let propertyValue = link.object[property];
            propertyValue = propertyValue ? propertyValue.toString() : '';
            return (
              <li key={property}>
                <span className={classPropertyName}>{property}</span>: {propertyValue}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

export default PropertiesWindow;
