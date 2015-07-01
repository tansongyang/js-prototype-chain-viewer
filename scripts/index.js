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
		var div, prototype, constructor;

		// Predicate for checking
		function prototypeIsContructorPrototype(constructor) {
			return prototype === constructor.prototype;
		}

		// Clear original
		while (output.firstChild) {
			output.removeChild(output.firstChild);
		}

		// Append base object
		div = document.createElement("div");
		div.id = "object";
		div.innerHTML = exports.object.id;
		output.appendChild(div);

		// Walk prototype chain
		for (prototype = Object.getPrototypeOf(exports.object); prototype; prototype = Object.getPrototypeOf(prototype)) {
			if (prototype.id) {
				// For now, assume users will give objects an id attribute
				div = document.createElement("div");
				div.classList.add("prototype-object");
				div.innerHTML = prototype.id;
				output.appendChild(div);
				continue;
			}

			constructor = exports.constructors.filter(prototypeIsContructorPrototype)[0];
			if (constructor) {
				div = document.createElement("div");
				div.classList.add("constructor-prototype");
				div.classList.add("constructor");
				div.innerHTML = "(" + constructor + ").prototype";
				output.appendChild(div);

				div = document.createElement("div");
				div.classList.add("constructor");
				div.innerHTML = constructor;
				output.appendChild(div);

				continue;
			}

			if (prototype === Object.prototype) {
				div = document.createElement("div");
				div.id = "object-prototype";
				div.innerHTML = "Object.prototype";
				output.appendChild(div);
			}
		}
	}
})();
