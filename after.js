module.exports = function _after(count, f) {
  var c = 0, results = [];
  return function _callback() {
    switch (arguments.length) {
      case 0: results.push(null); break;
      case 1: results.push(arguments[0]); break;
      default: results.push(arguments); break;
    }
    if (++c === count) {
      f.apply(this, results);
    }
  };
};
