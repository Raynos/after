var suite = require('vows-fluent').suite,
	assert = require('assert'),
	after = require('../after.js');

suite("after").batch()
	.context("After")
		.topic(function() {
			return after;
		})
		.vow("is a function", function(a) {
			assert.ok(typeof a === "function", "After is not a function");
			assert.ok(a.length === 2, "The length is not two");
		})
		.context("after(1, f)")
			.topic(function (a) {
				var f = a(1, function() {
					f.fired = true;
				});
				return f;
			})
			.vow("fires after being called once", function(f) {
				assert.ok(!f.fired, "It fired immediatly")
				f();
				assert.ok(f.fired, "It does not fire after once");
			})
			.parent()
		.context("after(n, f)")
			.topic(function(a) {
				var arr = [];
				for (var i = 0; i < 100; i++) {
					arr[i] = a(i, function() {
						arr[i].fired = true;
					});
				}
				return arr;
			})
			.vow("fires after being called n times", function(arr) {
				arr.forEach(function(k, v) {
					for (var i = 0; i < k; i++) {
						v();
						if (i === k - 1) {
							assert.ok(v.fired, "It did not fire when expected" + k + i);
						} else {
							assert.ok(!v.fired, "It fired when not expected" + k + i)
						}
					}
				});
			})
			.parent()
		.vow("returns null for no arguments", function(a) {
			a(1, function(val) {
				assert.equal(null, val, "result is not null");
			})();
		})
		.vow("returns value for one argument", function(a) {
			["string", null, undefined, /foo/, [], {}, 1].forEach(function(val) {
				var f= a(1, function(value) {
					assert.equal(val, value, "result is not equal as expected" + value + val);
				})(val);	
			});
		})
		.vow("returns an array for multiple arguments", function(a) {
			var arr = ["lol", "foo", "baz"];
			a(1, function(array) {
				Object.keys(array).forEach(function (key) {
					assert.equal(array[key], arr[key], "result is not equal as expected" + array[key] + arr[key]);
				})
			}).apply(null, arr); 
		})
		.vow("returns multiple arguments from multiple calls", function(a) {
			var fs = [];
			for (var i = 1; i < 100; i++) {
				(function(i) {
					fs[i] = a(i, function() {
						assert.equal(arguments.length, i, "arguments is not the right size" + arguments.length + i);
						for (var j = 0; j < i; j++) {
							assert.equal(j, arguments[j], "value is not as expected" + j + arguments[j]);
						}
					});	
				}).call(null, i);
			}
			fs.forEach(function(v, k) {
				for (var i = 0; i < k; i++) {
					v(i);
				}
			});
		})
		.suite()
.end().export(module);