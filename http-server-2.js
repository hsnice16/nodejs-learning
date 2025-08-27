var http = require("http");

var server = new http.Server();

server.on("connection", function (socket) {
  console.log("Client arrived: " + new Date());

  socket.on("end", function () {
    console.log("Client left: " + new Date());
  });
});

server.on("request", function (request, response) {
  request.setEncoding("utf-8");
  request.on("readable", function () {
    console.log(request.read());
  });
});

server.listen(8080);
