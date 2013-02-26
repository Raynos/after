module.exports = after

function after(count, callback) {
    proxy.count = count

    var errs = [];

    function proxy(err) {
        if (err) {
            errs.push(err);
        }

        --proxy.count === 0 && callback((errs.length) ? errs : null)
    }

    return (count === 0) ? callback() : proxy
}
