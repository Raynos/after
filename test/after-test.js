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
            after(0, done);
        });

        test("after 1", function (done) {
            var next = after(1, call(done));
            next();
        });

        test("after 5", function (done) {
            var next = after(5, call(done)), i = 5;
            while (i--) {
                next();
            }
        });

        test("manipulate count", function (done) {
            var next = after(1, call(done)), i = 5;

            next.count = i;
            while (i--) {
                next();
            }
        });

        test("after arguments", function (done) {
            var next = after(2, function () {
                assert(arguments[0][0] === data);
                assert(arguments[1][0] === data);
                assert(arguments[1][1] === data);
                done();
            }), data = {};

            next(data);
            next(data, data);
        });
    });

    var obj = {
        "foo": "bar",
        "foo1": "bar1",
        "foo2": "bar2"
    }

    suite("iterators", function () {
        test("multiple APIs", function (done) {
            done = after(4, call(done));

            after.forEach(obj, function (next) {
                assert(typeof next === "function");
                next();
            }, done);

            after.forEach(obj, function (value, next) {
                assert(typeof next === "function");
                next();
            }, done);

            after.forEach(obj, function (value, key, next) {
                assert(typeof next === "function");
                next();
            }, done);

            after.forEach(obj, function (value, key, obj, next) {
                assert(typeof next === "function");
                next();
            }, done);
        });

        test("context", function (done) {
            after.forEach(obj, function (next) {
                assert(this === obj);
                next();
            }, obj, call(done));
        });

        test("errors", function (done) {
            after.forEach(obj, function (next) {
                next(new Error("lulz"));
            }, obj, function (err) {
                assert(err.message === "lulz");
                done();
            })
        })
    });

    suite("forEach", function () {
        test("forEach on object", function (done) {
            after.forEach(obj, function (value, key, next) {
                assert(obj[key] === value);
                next();
            }, function () {
                done(); 
            });
        });
    });

    suite("map", function () {
        test("map on object", function (done) {
            after.map(obj, function (value, next) {
                next(null, value + value);
            }, function (err, o) {
                Object.keys(o).forEach(function (key) {
                    assert((obj[key] + obj[key]) === o[key]);
                });
                done();
            });
        });
    });

    suite("reduce", function () {
        test("reduce on object", function (done) {
            after.reduce(obj, function (memo, value, next) {
                next(null, memo + value);
            }, function (err, str) {
                assert(str === "barbar1bar2");
                done();
            });
        });
    })
});

function call(f) {
    return function () {
        f();
    };
}