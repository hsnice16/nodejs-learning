// File based database containing indexed
// information for six months of baseball scores
// for a single team
//
// Also a CLI to the database with basic query language

var fs = require("fs");
var readline = require("readline");

var cells = 186; // 6 * 31
var buffer = Buffer.alloc(cells);

while (cells--) {
  // 0, 1 or greater
  var rand = Math.floor(Math.random() * 3);

  // 78 = "N", 87 = "W", 76 = "L"
  buffer[cells] = rand === 0 ? 78 : rand === 1 ? 87 : 76;
}

fs.open("scores.txt", "r+", function (err, fd) {
  if (err) {
    console.log("Open Error:", err);
    return;
  }

  fs.write(
    fd,
    buffer,
    0,
    buffer.length,
    0,
    function (err, writtenBytes, buffer) {
      if (err) {
        console.log("Write Error:", err);
        return;
      }

      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      var quest = function () {
        rl.question("month/day:", function (index) {
          if (!index) {
            return rl.close();
          }

          var md = index.split("/");
          var pos = parseInt(md[0] - 1) * 31 + parseInt(md[1] - 1);

          fs.read(fd, Buffer.alloc(1), 0, 1, pos, function (err, br, buff) {
            if (err) {
              console.log("Read Error:", err);
              return;
            }

            var v = buff.toString();
            console.log(v === "W" ? "Win!" : v === "L" ? "Loss..." : "No game");
            quest();
          });
        });
      };

      quest();
    }
  );
});
