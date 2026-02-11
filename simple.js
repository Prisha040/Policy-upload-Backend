const http = require("http");

const server = http.createServer((req, res) => {
  res.end("ok");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("simple server listening on 3000");
});
