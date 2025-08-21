var fs = require("fs");
// var Twit = require("twit");

// var twit = new Twit({
//   consumer_key: "",
//   consumer_secret: "",
//   access_token: "",
//   access_token_secret: "",
// });

var tweetFile = "tweets.txt";
var writeStream = fs.createWriteStream(tweetFile, { flags: "a" });

var cleanBuffer = function (len) {
  var buf = Buffer.alloc(len);
  buf.fill("\0");
  return buf;
};

var check = function () {
  var handler = function (err, reply) {
    var buffer = cleanBuffer(reply.statuses.length * 140);

    reply.statuses.forEach(function (obj, idx) {
      buffer.write(obj.text, idx * 140, 140);
    });

    writeStream.write(buffer);
  };

  // twit.get("search/tweets", { q: "#nodejs since:2013-01-01" }, handler);

  handler(null, { statuses: [{ text: "fooooda" }] });
  setTimeout(check, 10000);
};

check();
