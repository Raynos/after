(function _anonymousWrapper(global) {
    "use strict";   

    var slice = [].slice;

    after.forEach = handleMultipleArguments(forEach);
    after.map = handleMultipleArguments(map);
    after.reduce = handleMultipleArguments(reduce);
    after.filter = handleMultipleArguments(filter);
    after.some = handleMultipleArguments(some);
    after.every = handleMultipleArguments(every);
    after.reduceRight = handleMultipleArguments(reduceRight);

    if (typeof module !== "undefined") {
        module.exports = after;
    } else {
        window.after = after;
    }

    function after(count, callback) {
        var results = [];

        proxy.count = count;

        return (count === 0) ? callback() : proxy;

        function proxy() {
            results.push(arguments);

            --proxy.count === 0 && callback.apply(this, results);
        }
    }

    function forEach(obj, callback, context, next, keys, length) {
        (function loop() {
            var key = keys.shift(),
                value = obj[key];

            if (--length === 0) {
                return next();
            }

            invokeCallback(callback, context, value, key, obj, loop);
        }());
    }

    function map(obj, callback, context, next, keys, length) {
        var returnValue = Object.create(Object.getPrototypeOf(obj));

        (function loop() {
            var key = keys.shift(),
                value = obj[key];

            if (length-- === 0) {
                return next(returnValue);
            }

            invokeCallback(callback, context, value, key, obj, proxy);

            function proxy(value) {
                returnValue[key] = value;
                loop();
            }
        }());
    }


    function reduce(obj, callback, memo, next, keys, length) {
        if (memo === null) {
            memo = obj[keys.shift()];
            length--;
        }

        (function loop() {
            var key = keys.shift(),
                value = obj[key];
            
            if (length-- === 0) {
                return next(memo);
            }

            invokeCallback(callback, null, memo, value, key, obj, proxy);

            function proxy(value) {
                memo = value;
                loop(); 
            }
        }());
    }

    function filter() {}
    function some() {}
    function every() {}
    function reduceRight() {}

    function handleMultipleArguments(f) {
        return proxy;

        function proxy(obj, callback, context, next) {
            if (typeof context === "function") {
                next = context;
                context = null;
            }

            var keys = Object.keys(obj);

            f(obj, callback, context, next, keys, keys.length);
        }
    }

    function invokeCallback(callback, context, memo, value, key, obj, next) {
        var callbackLength = callback.length;

        if (typeof obj === "function") {
            next = obj;
            obj = null;
        }

        if (callbackLength === 1) {
            callback.call(context, next);
        } else if (callbackLength === 2) {
            callback.call(context, memo, next);
        } else if (callbackLength === 3) {
            callback.call(context, memo, value, next);
        } else if (callbackLength === 4) {
            callback.call(context, memo, value, key, next);
        } else {
            callback.call(context, memo, value, key, obj, next);
        }
    }
}());
