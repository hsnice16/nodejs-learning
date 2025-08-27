var http = require("http");

// http
//   .request(
//     {
//       host: "www.google.com",
//       method: "GET",
//       path: "/",
//     },
//     function (response) {
//       response.setEncoding("utf-8");
//       response.on("readable", function () {
//         console.log(response.read());
//       });
//     }
//   )
//   .end();

http
  .get("http://www.google.com", function (response) {
    console.log("Status: " + response.statusCode);
  })
  .on("error", function (err) {
    console.log("Error: " + err.message);
  });
