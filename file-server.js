var fs = require("fs");
var http = require("http");
var crypto = require("crypto");
var formidable = require("formidable");

http
  .createServer(function (request, response) {
    var rm = request.method.toLowerCase();

    if (rm === "post") {
      var form = new formidable.IncomingForm();
      form.uploadDir = process.cwd();

      var resp = "";
      form
        .on("file", function (field, File) {
          resp += "File : " + File.originalFilename + "<br />";
        })
        .on("field", function (field, value) {
          resp += field + " : " + value + "<br />";
        })
        .on("end", function () {
          response.writeHead(200, { "content-type": "text/html" });
          response.end(resp);
        })
        .parse(request);
      return;
    }

    // We can only handle GET requests at this point
    if (rm !== "get") {
      return response.end("Unsupported Method");
    }

    if (request.url === "/") {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(`
        <form action="/uploads" enctype="multipart/form-data" method="post">
          Title: <input type="text" name="title"><br />
          <input type="file" name="upload" multiple="multiple"><br />
          <input type="submit" value="Upload">
        </form>
        `);

      return;
    }

    if (request.url === "/favicon.ico") {
      response.writeHead(200, {
        "content-type": "image/x-icon",
      });

      response.end();
      return;
    }

    var filename = __dirname + request.url;
    fs.stat(filename, function (err, stat) {
      if (err) {
        response.statusCode = err.errno === 34 ? 404 : 500;
        return response.end();
      }

      var etag = crypto
        .createHash("md5")
        .update(stat.size + stat.mtime)
        .digest("hex");
      response.setHeader("Last-Modified", stat.mtime);

      if (request.headers["if-none-match"] === etag) {
        response.statusCode = 304;
        return response.end();
      }

      response.setHeader("Content-Length", stat.size);
      response.setHeader("ETag", etag);
      response.statusCode = 200;
      fs.createReadStream(filename).pipe(response);
    });
  })
  .listen(8080);
