/*global suite, test*/

var assert = require("assert")
    , after = require("../")

test("exists", function () {
    assert(typeof after === "function", "after is not a function")
})

test("after when called with 0 invokes", function (done) {
    after(0, done)
});

test("after 1", function (done) {
    var next = after(1, done)
    next()
})

test("after 5", function (done) {
    var next = after(5, done)
    , i = 5

    while (i--) {
        next()
    }
})

test("manipulate count", function (done) {
    var next = after(1, done)
    , i = 5

    next.count = i
    while (i--) {
        next()
    }
})

test("multiple fails should call callback once", function(done) {
    var next = after(2, function(errs) {
        assert.equal(errs.length, 2);
        done();
    })

    next(new Error('one'));
    next(new Error('two'));
})

