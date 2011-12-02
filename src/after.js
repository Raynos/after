(function _anonymousWrapper(global) {
    "use strict";   

    var slice = [].slice;

    if (typeof module !== "undefined" && module.exports) {
        module.exports = after;
    } else {
        global.after = after;
    }

    function after(count, callback) {
        var counter = 0,
            results = [];

        if (count <= 0)  {
            return callback();
        }

        return afterProxy;

        function afterProxy(arg) {
            if (arguments.length === 1) {
                results.push(arg);
            } else if (arguments.length > 1) {
                results.push(slice.call(arguments));
            }

            counter++;

            if (counter >= count) {
                callback.apply(this, results);
            }
        }
    }

}(global || window));
