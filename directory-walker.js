var fs = require("fs");

directoryWalker(".", function (err, res) {
  console.log(require("util").inspect(res, { depth: null }));
})
  .on("directory", function (path, stat) {
    console.log("Director: " + path + " - " + stat.size);
  })
  .on("file", function (path, stat) {
    console.log("File: " + path + " - " + stat.size);
  });

function directoryWalker(dir, done, emitter) {
  var results = {};
  emitter = emitter || new (require("events").EventEmitter)();

  fs.readdir(dir, function (err, list) {
    var pending = list.length;

    if (err || !pending) {
      return done(err, results);
    }

    // traverse the list
    list.forEach(function (file) {
      if (file === ".git") {
        return !--pending && done(null, results);
      }

      var dFile = dir + "/" + file;

      fs.stat(dFile, function (err, stat) {
        if (stat.isDirectory()) {
          emitter.emit("directory", dFile, stat);
          return directoryWalker(dFile, function (err, res) {
            results[file] = res;
            !--pending && done(null, results);
          });
        }

        emitter.emit("file", dFile, stat);
        results[file] = stat.size;
        !--pending && done(null, results);
      });
    });
  });

  return emitter;
}
