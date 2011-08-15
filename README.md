# After #

All the flow control you'll ever need

var after = require("after");

var cb = after(3, function() {
  console.log("it works!");
});

cb();
cb();
cb(); // it works