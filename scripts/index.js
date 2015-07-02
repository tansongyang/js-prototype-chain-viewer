(function() {
	"use strict";

	var sampleCode = "function Foo(id) { this.id = id };" +
		"var foo = new Foo('foo');" +
		"var bar = Object.create(foo);" +
		"bar.id = 'bar';" +
		"exports.object = bar;" +
		"exports.constructors = [Foo];";
	var codeArea, output;

	document.addEventListener("DOMContentLoaded", function() {
		codeArea = document.getElementById("code");
		output = document.getElementById("output");

		document.getElementById("run").addEventListener("click", function() {
			var exports = parseJS(codeArea.value || sampleCode);
			display(exports);
		});
	});

	function parseJS(text) {
		/* jslint evil: true*/
		// This is part of required functionality
		var code = new Function("exports", text);
		var exports = {};
		code(exports); // Assume users will put base object in exports.object and constructors in exports.constructors
		return exports;
	}

	function display(exports) {
		var prototype, constructor;

		// Predicate for checking
		function prototypeIsContructorPrototype(constructor) {
			return prototype === constructor.prototype;
		}

		// Clear original
		while (output.firstChild) {
			output.removeChild(output.firstChild);
		}

		// Append base object
		appendDivToOutput(exports.object.id, [], "object");

		// Walk prototype chain
		for (prototype = Object.getPrototypeOf(exports.object); prototype; prototype = Object.getPrototypeOf(prototype)) {
			if (prototype.id) {
				// For now, assume users will give objects an id attribute
				appendDivToOutput(prototype.id, ["prototype-object"]);
				continue;
			}

			constructor = exports.constructors.filter(prototypeIsContructorPrototype)[0];
			if (constructor) {
				appendDivToOutput("(" + constructor + ").prototype", ["constructor", "constructor-prototype"]);
				appendDivToOutput(constructor, ["constructor"]);
				continue;
			}

			if (prototype === Object.prototype) {
				appendDivToOutput("Object.prototype", [], "object-prototype");
			}
		}
	}

	function appendDivToOutput(innerHTML, classList, id) {
		var div = document.createElement("div");
		var i;

		if (innerHTML) {
			div.innerHTML = innerHTML;
		}
		if (classList && classList.length >= 0) {
			for (i = 0; i < classList.length; i++) {
				div.classList.add(classList[i]);
			}
		}
		if (id) {
			div.id = id;
		}
		output.appendChild(div);
	}
})();