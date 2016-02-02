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
   * Get the name of this instance. Prototype objects return
   * "ConstructorFunction.Prototype", e.g. "Array.prototype". Objects with a
   * "name" property return the value of the property. Everything else returns
   * "(anonymous)".
   * @return {string}
   */
  get name() {
    return this[_name];
  }
}

function getName(object) {
  if (object.hasOwnProperty('constructor') &&
    object.constructor instanceof Function &&
    object.constructor.prototype === object) {
    return object.constructor.name + '.prototype';
  }

  if (object instanceof Function || 'name' in object) {
    return object.name;
  }

  return '(anonymous)';
}
