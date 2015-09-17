"use strict";

import PrototypeLink from "./PrototypeLink";

const mArray = Symbol("PrototypeChain.mArray");

export default class PrototypeChain {
  constructor(object) {
    this[mArray] = Array.from(getPrototypeChain(object));
  }

  get length() {
    return this[mArray].length;
  }

  [Symbol.iterator]() {
    return this[mArray].values();
  }

  get(index) {
    return this[mArray][index];
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