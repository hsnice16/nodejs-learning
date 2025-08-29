var http = require("http");
var obj = {};

http
  .createServer(function (req, res) {
    var auth = req.headers["authorization"];
    if (!auth) {
      res.writeHead(401, { "www-authenticate": 'Basic realm = "Secure Area"' });
      return res.end(
        "<html><body>Please enter some credentials.</body></html>"
      );
    }

    var tmp = auth.split(" ");
    var buf = Buffer.from(tmp[1], "base64");

    var plain_auth = buf.toString();
    var creds = plain_auth.split(":");
    var username = creds[0];
    var password = creds[1];

    // Find this user record
    if (obj[username]) {
      res.statusCode = 200;
      return res.end("<html><body>Welcome!</body></htlm>");
    } else {
      obj[username] = password;
      res.writeHead(401, { "www-authenticate": 'Basic realm = "Secure Area"' });
      return res.end("<htm><body>You are not authorized.</body></html>");
    }
  })
  .listen(8080);
