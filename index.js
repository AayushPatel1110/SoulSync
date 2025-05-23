const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("play", (data) => {
    socket.broadcast.emit("play", data);
  });

  socket.on("pause", (data) => {
    socket.broadcast.emit("pause", data);
  });

  socket.on("seek", (data) => {
    socket.broadcast.emit("seek", data);
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
