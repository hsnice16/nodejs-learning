var fs = require("fs");
var readline = require("readline");

var rl = readline.createInterface({
  input: fs.createReadStream("dictionary.txt"),
  terminal: false,
});

rl.on("line", function (ln) {
  console.log("line:", ln.trim());
});
