var stream = require("stream");

// #1 & #2

// var writable = new stream.Writable({ decodeStrings: false });

// writable._write = function (chunk, encoding, callback) {
//   console.log(chunk);
//   callback();
// };

// #1

// var w = writable.write(Buffer.alloc(100));
// writable.end();
// console.log(w);

// #2

// var w = writable.write(Buffer.alloc(16384));
// console.log(w);

var writable = new stream.Writable({ highWaterMark: 10 });
writable._write = function (chunk, encoding, callback) {
  process.stdout.write(chunk);
  callback();
};

writable.on("drain", function () {
  writable.write("Z\n");
});

var buf = Buffer.alloc(20, "A", "utf-8");
console.log(writable.write(buf.toString()));
