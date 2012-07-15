module.exports = after

function after(count, callback) {
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err) {
        if (err) {
            return callback(err)
        }

        --proxy.count === 0 && callback()
    }
}