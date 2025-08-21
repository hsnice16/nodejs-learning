var fs = require("fs");

// persistent false will not keep the process alive if
// the watcher is the only activity keeping it running.
fs.watch(__filename, { persistent: false }, function (event, filename) {
  console.log(event);
  console.log(filename);
});

setImmediate(function () {
  fs.rename(__filename, __filename + ".new", function () {});
});
