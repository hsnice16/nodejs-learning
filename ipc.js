setInterval(function () {}, 1e6);
process.on("SIGUSR1", function () {
  console.log("Got a signal!");
});

//
// node ipc.js -- run the code
//
// ps aux | grep ipc.js -- in a new terminal, find the process ID
//
// kill -s SIGUSR1 <pid> -- send signal
//
