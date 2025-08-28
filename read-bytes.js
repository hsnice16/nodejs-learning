var fs = require("fs");

fs.open("dictionary.txt", "r", function (err, fd) {
  if (err) {
    console.log("Open Error:", err);
    return;
  }

  fs.fstat(fd, function (err, stats) {
    if (err) {
      console.log("Stat Error:", err);
      return;
    }

    var totalBytes = stats.size;
    var buffer = Buffer.alloc(totalBytes);
    var bytesRead = 0;

    // Each call to read should ensure that chunk size is
    // within proper sizes ranges (not too small; not too large).
    var read = function (chunkSize) {
      fs.read(
        fd,
        buffer,
        bytesRead,
        chunkSize,
        bytesRead,
        function (err, numBytes, bufRef) {
          if ((bytesRead += numBytes) < totalBytes) {
            return read(Math.min(512, totalBytes - bytesRead));
          }

          fs.close(fd);
          console.log("File read complete. Total bytes read: " + totalBytes);

          // Note that the callback receives a reference to the
          // accumulating buffer
          console.log(bufRef.toString());
        }
      );
    };

    read(Math.min(512, totalBytes));
  });
});
