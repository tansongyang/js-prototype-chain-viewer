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

		document.getElementById("code-wrapper").classList.remove("is-uninitialized");
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
		var prototype, constructor, nodes;

		// Predicate for checking if prototype is a constructor prototype
		function prototypeIsContructorPrototype(constructor) {
			return prototype === constructor.prototype;
		}

		// Clear original
		while (outputContent.firstChild) {
			outputContent.removeChild(outputContent.firstChild);
		}

		// Append root object
		appendPrototypeNode(exports.object.id, ["prototype"], "root-object");

		// Walk prototype chain
		for (prototype = Object.getPrototypeOf(exports.object); prototype; prototype = Object.getPrototypeOf(prototype)) {
			if (prototype === Object.prototype) {
				// Reached the end, which is Object.prototype
				appendPrototypeNode("Object.prototype", ["prototype"], "object-prototype");
				break;
			}

			constructor = exports.constructors.filter(prototypeIsContructorPrototype)[0];
			if (constructor) {
				// This prototype is a constructor's prototype
				appendPrototypeNode(constructor.name, ["constructor"], constructor.name, true);
			} else {
				// This prototype is just an object
				appendPrototypeNode(prototype.id, ["prototype"]);
			}
		}
	}

	function appendPrototypeNode(text, classList, id, isConstructor) {
		var div = document.createElement("div"),
			innerDiv;

		if (isConstructor) {
			// Group constructor and constructor,prototype together
			div.classList.add("constructor-prototype-wrapper");

			innerDiv = getPrototypeNode(id + ".prototype", ["prototype", "constructor-prototype"]);
			div.appendChild(innerDiv);

			innerDiv = getPrototypeNode(id, ["constructor"]);
			div.appendChild(innerDiv);
		} else {
			div = getPrototypeNode(text, classList, id);
		}

		outputContent.appendChild(div);
	}

	function getPrototypeNode(text, classList, id) {
		var div = document.createElement("div");
		var i;

		if (text) {
			div.innerHTML = '<span class="output-div-text">' + text + "</span>";
		}
		div.classList.add("output-div");
		if (classList && classList.length >= 0) {
			for (i = 0; i < classList.length; i++) {
				div.classList.add(classList[i]);
			}
		}
		if (id) {
			div.id = id;
		}

		div.addEventListener("click", function() {
			if (div.classList.contains("is-active")) {
				div.classList.remove("is-active");
			} else {
				div.classList.add("is-active");
			}
		});

		return div;
	}
})();