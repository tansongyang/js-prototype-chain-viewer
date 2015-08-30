"use strict";

import PrototypeLink from "./PrototypeLink";

const mArray = Symbol("PrototypeChain.mArray");

export default class PrototypeChain {
	constructor(object) {
		this[mArray] = [ new PrototypeLink(object) ];
		pushPrototypes(object, this[mArray]);
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

function pushPrototypes(object, array) {
	for (let prototype = Object.getPrototypeOf(object);
		prototype !== null;
		prototype = Object.getPrototypeOf(prototype)) {

		array.push(new PrototypeLink(prototype));
	}
}