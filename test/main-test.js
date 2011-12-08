var tester = require("tester"),
    assert = require('assert'),
    after = require('../src/after.js');

module.exports = {
    "after": function () {
        assert(after.length === 2);
        assert(typeof after === "function");
    },
    "after no arguments": function () {
        after(1, testItIsInvoked)();

        function testItIsInvoked() {
            assert(arguments.length === 0);
        }
    },
    "after one argument": function () {
        ["string", null, undefined, /foo/, [], {}, 1].forEach(runTest);

        function runTest(val) {
            after(1, testValueIsReturned)(val); 

            function testValueIsReturned(value) {
                assert(val === value);
            }
        }
    },
    "after multiple arguments": function () {
        var arr = ["lol", "foo", "baz"];
        after(1, testMultipleValues).apply(null, arr); 

        function testMultipleValues(array) {
            array.forEach(testValueIsAsExpected);

            function testValueIsAsExpected(key) {
                assert(array[key] === arr[key]);
            }
        }
    },
    "after multiple calls": function () {
        var fs = [];
        for (var i = 1; i < 100; i++) {
            constructData(i);
        }
        fs.forEach(callFunctionNTimes);

        function callFunctionNTimes(v, k) {
            for (var i = 0; i < k; i++) {
                v(i);
            }
        }

        function constructData(i) {
            fs[i] = after(i, testReturnedData); 

            function testReturnedData() {
                assert(arguments.length === i);
                for (var j = 0; j < i; j++) {
                    assert(j === arguments[j]);
                }
            }
        }
    },
    "after(0, f)": function () {
        var bool = true;
        after(0, testItFiresImmediatly);
        bool = false;

        function testItFiresImmediatly() {
            assert(bool);
        }
    },
    "after (1, f)": function () {
        var next = after(1, setFiredFlag);
        assert(!next.fired);
        next();
        assert(next.fired);

        function setFiredFlag() {
            next.fired = true;
        }
    },
    "after (n, f)": function () {
        var arr = [];
        for (var i = 1; i < 100; i++) {
            arr[i] = after(i, setFiredFlag);
        }
        arr.forEach(testItFiresAtCorrectPoint);

        function testItFiresAtCorrectPoint(k, v) {
            for (var i = 1; i < k; i++) {
                v();
                if (i === k - 1) {
                    assert(v.fired);
                } else {
                    assert(!v.fired)
                }
            }
        }

        function setFiredFlag() {
            arr[i].fired = true;
        }
    },
    "after async": function (done) {
        var bool = false;
        done(checkBoolIsSet);
        var next = after(1, setBool);
        setTimeout(next, 100);

        function checkBoolIsSet() {
            assert(bool);
        }

        function setBool() {
            bool = true;
            done();
        }
    },
    "forEach": function () {
        assert(after.forEach);
        assert(after.each);

        var arr = [1,2,3,4],
            obj = {
                "foo": "bar",
                "baz": "boz"
            },
            context = {};

        after.forEach(arr, arrayIterator, finished);

        after.forEach(obj, objIterator, context, finished);

        function arrayIterator(value, index, callback) {
            assert(arr[index] === value);
            assert(typeof callback === "function");
            callback();
        }

        function objIterator(value, index, callback) {
            assert(obj[index] === value);
            assert(this === context);
            callback();
        }

        function finished(err) {
            assert(err === null);
        }
    },
    "map": function () {
        assert(after.map);

        var arr = [1,2,3,4],
            obj = {
                "foo": "bar",
                "baz": "boz"
            };

        after.map(arr, arrayIterator, arrayFinished);

        after.map(obj, objIterator, objFinished);

        function arrayIterator(value, index, callback) {
            callback(null, value*2);
        }

        function objIterator(value, index, callback) {
            callback(null, value + value);
        }

        function arrayFinished(err, result) {
            assert(err === null);
            assert(result.length === arr.length);
            result.forEach(checkValue);

            function checkValue(value, index) {
                assert(value === arr[index] * 2);
            }
        }

        function objFinished(err, result) {
            assert(err === null);
            Object.keys(result).forEach(checkValue);

            function checkValue(name) {
                assert(result[name] === obj[name] + obj[name]);
            }
        }
    }
}

if (!module.parent) {
    tester(module.exports);
}