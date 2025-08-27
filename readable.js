var stream = require("stream");

var Feed = function (channel) {
  // #1

  // var readable = new stream.Readable({ encoding: "utf-8" });
  // var news = ["Big Win!", "Stocks Down!", "Actor Sad!"];

  var readable = new stream.Readable({ objectMode: true });
  var prices = [{ price: 1 }, { price: 2 }];

  readable._read = function () {
    // #1

    // if (news.length) {
    //   return readable.push(news.shift() + "\n");
    // }

    // return readable.push(null);

    // #2

    // readable.push("Sequence of bytes");
    // readable.push(null);

    if (prices.length) {
      return readable.push(prices.shift() + "\n");
    }

    return readable.push(null);
  };

  return readable;
};

var feed = new Feed();

// #1

// feed.on("readable", function () {
//   var data = feed.read();
//   data && process.stdout.write(data);
// });

// feed.on("end", function () {
//   console.log("No more news");
// });

// #2

// feed.on("readable", function () {
//   var character;
//   while ((character = feed.read(1))) {
//     console.log(character);
//   }
// });

feed.on("readable", function () {
  var data = feed.read();
  data && process.stdout.write(data);
});
