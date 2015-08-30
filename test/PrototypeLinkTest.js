/* globals expect */
"use strict";

import PrototypeLink from "../scripts/PrototypeLink";

describe("PrototypeLink", () => {
	describe("name", () => {
		it('returns the "name" property of `object`', () => {
			let name = "Carl Ditters von Dittersdorf";
			let object = {
				name: name
			};
			let link = new PrototypeLink(object);
			expect(link.name).to.equal(name);
		});

		it('returns "(anonymous)" when `object` has no "name" property', () => {
			let object = {};
			let link = new PrototypeLink(object);
			expect(link.name).to.equal("(anonymous)");
		});


		it('returns "Constructor.prototype" when `object` is the prototype ' +
			'of the constructor function "Constructor"', () => {

			function Constructor() { }
			let c = new Constructor();
			let object = Object.getPrototypeOf(c);
			let link = new PrototypeLink(object);
			expect(link.name).to.equal("Constructor.prototype");
		});
	});
});
