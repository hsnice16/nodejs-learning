var http = require("http");
var net = require("net");
var url = require("url");

var proxy = new http.Server();

// Proxy Server responding to HTTP CONNECT
proxy
  .on("connect", function (request, clientSocket, head) {
    var reqData = url.parse("http://" + request.url);
    var remoteSocket = net.connect(reqData.port, reqData.hostname, function () {
      clientSocket.write("HTTP/1.1 200 \r\n\r\n");
      remoteSocket.write(head);

      remoteSocket.pipe(clientSocket);
      clientSocket.pipe(remoteSocket);
    });
  })
  .listen(8080);

var request = http.request({
  port: 8080,
  hostname: "localhost",
  method: "CONNECT",
  path: "www.google.com:80",
});
request.end();

// CONNECT request to the Proxy Server
request.on("connect", function (res, socket, head) {
  socket.setEncoding("utf-8");
  socket.write(
    "GET / HTTP/1.1\r\nHost: www.google.com:80\r\nConnection: close\r\n\r\n"
  );

  socket.on("readable", function () {
    console.log(socket.read());
  });
  socket.on("end", function () {
    proxy.close();
  });
});
