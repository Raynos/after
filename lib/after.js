module.exports = after

function after(count, callback, err_cb) {
    var bail = false;
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times');
        }
        --proxy.count;

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err);
            // future error callbacks will go to error handler
            return callback = (err_cb || function() {})
        }
        proxy.count === 0 && !bail && callback()
    }
}

