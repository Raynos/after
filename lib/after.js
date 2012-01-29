(function _anonymousWrapper(global) {
    "use strict";   

    var slice = [].slice;

    after.forEach = forEach;
    after.map = map;
    after.reduce = reduce;
    after.filter = filter;
    after.some = some;
    after.every = every;
    after.reduceRight = reduceRight;

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

            proxy.count-- === 0 && callback.apply(this, results);
        }
    }

    function forEach() {}
    function map() {}
    function reduce() {}
    function filter() {}
    function some() {}
    function every() {}
    function reduceRight() {}
}());
