var path = require("path");
var express = require("express");
var http = require("node:http");
var socket = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = new socket.Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "canvas.html"));
});

io.on("connection", function (socket) {
  var id = socket.id;

  console.log("Client Id:", id);

  socket.on("mousemove", function (data) {
    data.id = id;
    socket.broadcast.emit("moving", data);
  });

  socket.on("disconnect", function () {
    socket.broadcast.emit("clientdisconnect", id);
  });
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
