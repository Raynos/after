/*global suite, test*/

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

    suite("after", function () {
        test("after when called with 0 invokes", function (done) {
            after(0, done)
        });

        test("after 1", function (done) {
            var next = after(1, call(done))
            next()
        })

        test("after 5", function (done) {
            var next = after(5, call(done))
                , i = 5

            while (i--) {
                next()
            }
        })

        test("manipulate count", function (done) {
            var next = after(1, call(done))
                , i = 5

            next.count = i
            while (i--) {
                next()
            }
        })

        test("after terminates on error", function (done) {
            var next = after(2, call(done))

            next({})
        })
    })
})

function call(f) {
    return function () {
        f()
    }
}