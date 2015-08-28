"use strict";

const mObject = Symbol("object");

export default class PrototypeLink {
	constructor(object) {
		this[mObject] = object;
	}

	get object() {
		return this[mObject];
	}
}