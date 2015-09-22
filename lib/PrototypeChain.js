"use strict";

import PrototypeLink from "./PrototypeLink";

const _array = Symbol("PrototypeChain._array");

/**
 * Represents a prototype chain.
 */
export default class PrototypeChain {
  /**
   * Constructs a new instance of PrototypeChain. It walks the chain backwards
   * until it reaches Object.prototype.
   * @param  {Object} object The "head" of the chain.
   */
  constructor(object) {
    this[_array] = Array.from(getPrototypeChain(object));
  }

  /**
   * Gets the length of the PrototypeChain.
   * @example
   * new PrototypeChain(Object.prototype).length === 1
   * @example
   * new PrototypeChain({}).length === 2
   * @return {Number}
   */
  get length() {
    return this[_array].length;
  }

  /**
   * Returns an Iterator that lets you walk the prototype chain from head to
   * tail.
   * @return {Iterator}
   */
  [Symbol.iterator]() {
    return this[_array].values();
  }

  /**
   * Gets the PrototypeLink at the specified index, or undefined if there is
   * none at that index.
   * @param  {Number} index
   * @return {PrototypeLink}
   */
  get(index) {
    return this[_array][index];
  }
}

function* getPrototypeChain(object) {
  yield new PrototypeLink(object);

  for (let prototype = Object.getPrototypeOf(object);
    prototype !== null;
    prototype = Object.getPrototypeOf(prototype)) {

    yield new PrototypeLink(prototype);
  }
}