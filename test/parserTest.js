/* globals expect */
"use strict";

import parser from "../scripts/parser";

describe("parser", () => {
	describe(".parse()", () => {
		it("throws an error if arguments are missing", () => {
			let f = () => parser.parse();
			expect(f).to.throw('ArgumentException: "code" is null or undefined.');
		});
	});
});