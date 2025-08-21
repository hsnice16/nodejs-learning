process.on("message", function (msg) {
  console.log("Parent said: ", msg);
  process.send("I love you too");
});
