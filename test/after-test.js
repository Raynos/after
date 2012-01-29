var assert = require("assert"),
    after = require("../lib/after.js");

suite("After", function () {
    test("exists", function () {
        assert(typeof after === "function", "after is not a function");
        assert(after.forEach, "forEach");
        assert(after.map, "map");
        assert(after.reduce, "reduce");
        assert(after.reduceRight, "reduceRight");
        assert(after.every, "every");
        assert(after.filter, "filter");
        assert(after.some, "some");
    });

    test("after when called with 0 invokes", function (done) {
        after(0, done);
    });
});