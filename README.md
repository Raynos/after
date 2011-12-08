# After [![Build Status][1]][2]

All the flow control you'll ever need

## Status: production ready

## Example

    var after = require("after"),
    	next = after(3, logItWorks);

    next();
    next();
    next(); // it works

    function logItWorks() {
    	console.log("it works!");
    }

## Motivation 

Minimal flow control. A lot of the libraries out there are over kill. I want a small tool that gives me fundamental concrete building blocks

## Documentation

### after(count, callback) <a name="after" href="#after"><small><sup>link</sup></small></a>

`after` takes a count and a callback and returns a function `next`. The callback get's invoked when the `next` function is invoked count number of times. The callback aggregates the data given to `next` as un-ordered parameters.

	var next = after(3, printData);

	next("foo", "bar", { ... })
	next({ ... });
	next(42);

	function printData() {
		for (var i = 0, len = arguments.length; i < len; i++) {
			console.log(arguments[i]);	
		}
		// in some order
		// 42
		// { ... }
		// [ "foo", "bar", { ... }]
	}

### after set utilities

The following methods are asynchronous parallel versions of the `Array.prototype` methods.

They all take an `iterator` and a `finishedCallback`

These `iterator`'s are of the form `(value, index, set, callback)`. The `callback` can be invoked with `(err, result)`

The `finishedCallback` is of the form `(err, result)` as invoked when all iterators have invoked their individual callback.

### after.forEach(set, iterator, optionalContext, finishedCallback) <a name="after.forEach" href="#after.forEach"><small><sup>link</sup></small></a>

	var set = {
		google: googleUser,
		github: githubUser,
		facebook: facebookUser
	};

	after.forEach(set, synchronizeOAuth, finished)

	function synchronizeOAuth(userObject, oAuthName, _, callback) {
		getOAuth(key).sychrnonize(userObject, callback);
	}

	function finished(err) {
		if (err) throw err;
	}

## Installation

`npm install after`

## Tests

`node test/main-test.js`

## Blog post

[Flow control in node.js][3]

## Examples :

 - [Determining the end of asynchronous operations][4]
 - [In javascript what are best practices for executing multiple asynchronous functions][5]
 - [JavaScript performance long running tasks][6]
 - [Synchronous database queries with node.js][7]

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/after.js.png
  [2]: http://travis-ci.org/Raynos/after.js
  [3]: http://raynos.org/blog/2/Flow-control-in-node.js
  [4]: http://stackoverflow.com/questions/6852059/determining-the-end-of-asynchronous-operations-javascript/6852307#6852307
  [5]: http://stackoverflow.com/questions/6869872/in-javascript-what-are-best-practices-for-executing-multiple-asynchronous-functi/6870031#6870031
  [6]: http://stackoverflow.com/questions/6864397/javascript-performance-long-running-tasks/6889419#6889419
  [7]: http://stackoverflow.com/questions/6597493/synchronous-database-queries-with-node-js/6620091#6620091