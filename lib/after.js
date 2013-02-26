module.exports = after

function after(count, callback) {
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy() {
        --proxy.count === 0 && callback()
    }
}
