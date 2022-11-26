const app = require("express")();
const server = require("http").createServer(app);
const options = {
  cors: {
    origins: "*",
  },
};

const io = require("socket.io")(server, options);

let state = {
  files: [
    {
      name: "holamundo.py",
      content:
        'print("Hola mundo")',
    },
  ],
  active: 0,
  mode: "text/x-c++src",
};

console.log(state.files[0].content);

io.on("connection", (socket) => {
  console.log(socket.id);
  io.emit("broadcast", state);

  socket.on("emit", (arg) => {
    state = arg;
    socket.broadcast.emit("broadcast", state);
  });
});

server.listen(process.env.PORT || 3000);
