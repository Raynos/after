# After #

All the flow control you'll ever need

    var after = require("after");

    var cb = after(3, function() {
      console.log("it works!");
    });

    cb();
    cb();
    cb(); // it works

**Examples : **

 - http://stackoverflow.com/questions/6852059/determining-the-end-of-asynchronous-operations-javascript/6852307#6852307
 - http://stackoverflow.com/questions/6869872/in-javascript-what-are-best-practices-for-executing-multiple-asynchronous-functi/6870031#6870031
 - http://stackoverflow.com/questions/6864397/javascript-performance-long-running-tasks/6889419#6889419
 - http://stackoverflow.com/questions/6597493/synchronous-database-queries-with-node-js/6620091#6620091