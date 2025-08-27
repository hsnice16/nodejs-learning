var stream = require("stream");
var net = require("net");

net
  .createServer(function (socket) {
    socket.write("Go ahead and type something!\n");

    socket.on("readable", function () {
      var data = this.read();

      process.stdout.write("Echo: " + data);
      socket.write(data);
    });
  })
  .listen(8080);
