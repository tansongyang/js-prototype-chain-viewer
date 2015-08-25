"use strict";

function parse(code) {
	if (!code) {
		throw 'ArgumentException: "code" is null or undefined.';
	}

	/* jslint evil: true*/
	// This is part of required functionality
	let evaluate = new Function("exports", code);
	let exports = {};
	evaluate(exports);

	// Assume users will put base object in exports.object
	// and constructors in exports.constructors

	exports.constructors = exports.constructors || [];
	exports.constructors = exports.constructors.concat([
		Function,
		Array
	]); // Include fundamental objects

	return exports;
}

export default Object.freeze({
	parse: parse
});
