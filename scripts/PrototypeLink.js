"use strict";

const mObject = Symbol("PrototypeLink.mObject");
const mName = Symbol("PrototypeLink.mName");

export default class PrototypeLink {
	constructor(object) {
		this[mObject] = object;
		this[mName] = getName(object);
	}

	get object() {
		return this[mObject];
	}

	get name() {
		return this[mName];
	}
}

function getName(object) {
	if (object.hasOwnProperty("constructor") &&
		object.constructor instanceof Function &&
		object.constructor.prototype === object) {
		return object.constructor.name + ".prototype";
	}

	if (object instanceof Function || "name" in object) {
		return object.name;
	}

	return "(anonymous)";
}
