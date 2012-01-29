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

            invokeCallback(callback, context, value, key, obj, proxy);

            function proxy(err) {
                if (err) return next(err);
                loop();
            }
        }());
    }

    function map(obj, callback, context, next, keys, length) {
        var returnValue;
        if (Array.isArray(obj)) {
            returnValue = [];
        } else {
            returnValue = Object.create(Object.getPrototypeOf(obj));
        }

        (function loop() {
            var key = keys.shift(),
                value = obj[key];

            if (length-- === 0) {
                return next(null, returnValue);
            }

            invokeCallback(callback, context, value, key, obj, proxy);

            function proxy(err, value) {
                if (err) return next(err);
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
                return next(null, memo);
            }

            invokeCallback(callback, null, memo, value, key, obj, proxy);

            function proxy(err, value) {
                if (err) return next(err);
                memo = value;
                loop(); 
            }
        }());
    }

    function filter(obj, callback, context, next, keys, length) {
        var returnValue;
        if (Array.isArray(obj)) {
            returnValue = [];
        } else {
            returnValue = Object.create(Object.getPrototypeOf(obj));
        }

        (function loop () {
            var key = keys.shift(),
                value = obj[key];

            if (length-- === 0) {
                return next(null, returnValue);
            }

            invokeCallback(callback, context, value, key, obj, proxy);

            function proxy(err, bool) {
                if (err) return next(err);
                if (bool) returnValue[key] = value;
                loop();
            }
        }());
    }

    function some() {
        
    }
    
    function every() {
        
    }

    function reduceRight(obj, callback, memo, next, keys, length) {
        reduce(obj, callback, memo, next, keys.reverse(), length);
    }

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
