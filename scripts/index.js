(function() {
	"use strict";

	var sampleCode = "function Foo(id) { this.id = id };" +
		"var foo = new Foo('foo');" +
		"var bar = Object.create(foo);" +
		"bar.id = 'bar';" +
		"exports.object = bar;" +
		"exports.constructors = [Foo];";
	var codeArea, outputContent;

	document.addEventListener("DOMContentLoaded", function() {
		codeArea = document.getElementById("code");
		outputContent = document.getElementById("output-content");

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

		// Predicate for checking if prototype is a constructor prototype
		function prototypeIsContructorPrototype(constructor) {
			return prototype === constructor.prototype;
		}

		// Clear original
		while (outputContent.firstChild) {
			outputContent.removeChild(outputContent.firstChild);
		}

		// Append root object
		appendDivToOutput(exports.object.id, ["prototype"], "root-object");

		// Walk prototype chain
		for (prototype = Object.getPrototypeOf(exports.object);
			prototype;
			prototype = Object.getPrototypeOf(prototype)) {

			if (prototype === Object.prototype) {
				// Reached the end, which is Object.prototype
				appendDivToOutput("Object.prototype", ["prototype"], "object-prototype");
				break;
			}

			constructor = exports.constructors.filter(prototypeIsContructorPrototype)[0];
			if (constructor) {
				// This prototype is a constructor's prototype
				appendDivToOutput(constructor.name + ".prototype", ["prototype", "constructor-prototype"]);
				appendDivToOutput(constructor.name, ["constructor"]);
			} else {
				// This prototype is just an object
				appendDivToOutput(prototype.id, ["prototype"]);
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
		outputContent.appendChild(div);
	}
})();