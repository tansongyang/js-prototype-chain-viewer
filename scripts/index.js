(function(){
	document.addEventListener("DOMContentLoaded", function () {
		var sampleCode = "function Foo(id) { this.id = id };" +
		"var foo = new Foo('foo');" +
		"var bar = Object.create(foo);" +
		"bar.id = 'bar';" +
		"exports.object = bar;" +
		"exports.constructors = [Foo];";
		var codeArea = document.getElementById("code");

		document.getElementById("run").addEventListener("click", function () {
			var code = new Function("exports", codeArea.value || sampleCode);
			var exports = {};
			code(exports);
			display(exports);
		});

		function display(exports) {
			var message = "The id of the object is: " + exports.object.id + "\r\n";
			var prototype, constructor;

			for (prototype = Object.getPrototypeOf(exports.object); prototype; prototype = Object.getPrototypeOf(prototype)) {
				if (prototype.id) {
					message += "Its prototype is the object: " + prototype.id + "\r\n";
					continue;
				}

				constructor = exports.constructors.filter(function(element) {
					return prototype === element.prototype;
				})[0];
				if (constructor) {
					message += "Its prototype is the prototype of the constructor function: " + constructor + "\r\n";
					continue;
				}

				if (prototype === Object.prototype) {
					message += "This is the end of the chain: Object.prototype.\r\n";
				}
			}

			alert(message);
		}
	});
})();