'use strict';

// Maps object instances to PrototypeLink instances so that there will always be
// a one-to-one relationship between the two.
const _instances = new Map();

// "Private" state
const _object = Symbol('PrototypeLink._object');
const _name = Symbol('PrototypeLink._name');

/**
 * Represents a link in a prototype chain.
 */
export default class PrototypeLink {
  /**
   * Constructs a new instance of PrototypeLink. The same object will always
   * return the same intance of PrototypeLink.
   * @param {object} object The object that the link represents.
   */
  constructor(object) {
    if (_instances.has(object)) {
      return _instances.get(object);
    }

    this[_object] = object;
    this[_name] = getName(object);
    _instances.set(object, this);
  }

  /**
   * Get the underlying object that was used to construct this instance.
   * @return {object}
   */
  get object() {
    return this[_object];
  }

  /**
   * Get the name of this instance.
   * Prototype objects return "{constructor}.prototype", e.g. "Array.prototype".
   * Objects with a "id" or "name" property return the value of the property;
   * "id" gets preference.
   * Everything else returns "(anonymous)".
   * @return {string}
   */
  get name() {
    return this[_name];
  }

  /**
   * Safely gets the names of own properties of the object.
   * Does not return restricted properties. 
   * @return {string[]}
   */
  getOwnPropertyNamesSafe() {
    let properties = Object.getOwnPropertyNames(this.object);
    if (this.object === Function.prototype) {
      properties = properties.filter(p => p !== 'caller' && p !== 'arguments');
    }
    return properties;
  }
}

function getName(object) {
  if (object.hasOwnProperty('constructor') &&
    object.constructor instanceof Function &&
    object.constructor.prototype === object) {
    return object.constructor.name + '.prototype';
  }
  if ('id' in object) {
    return object.id;
  }
  if (object instanceof Function || 'name' in object) {
    return object.name;
  }
  return '(anonymous)';
}
