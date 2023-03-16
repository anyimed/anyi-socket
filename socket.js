const { Server } = require("socket.io");
const { game } = require("./define");
const app = require("./app");
let io = null
function connect(socket) {
  console.log('a user connected', socket.id);
  socket.on("req-game", function (req) {
    if (socket.rooms.has("system")) {
      io.to("system").emit("res-game", {
        current: game.current + 1,
        rows: game.lists
      });
    } 
    if (socket.rooms.has("player")) {
      io.to("player").emit("res-game", {
        current: game.current + 1,
        row: game.lists[game.current]
      });
    }


  })
  socket.on("req-vote", function (req) {
    game.lists[game.current].answer[req.index].score.vote++
    app.calculates(game.lists[game.current])
    // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    io.to("system").emit("voting", { current: (parseInt(game.current) + 1),row: game.lists[game.current], sum: game.lists[game.current].sum });
  })
  // socket.on("join", function (roomName) {
  //   // console.log(io.sockets.adapter.rooms.size)
  //   // console.log(io.engine.clientsCount)
  //   // console.log(io.sockets.sockets.length)
  //   // var numClients = io.sockets.adapter.rooms[roomName].size;
  //   // if (numClients == 0) {
  //   //   socket.join(roomName);
  //   // } else if (numClients == 1) {
  //   //   socket.join(roomName);
  //   // } else {
  //   //   console.log("More than 2 users.");
  //   // }


  //   socket.join(userId);

  //   // and then later
  //   io.to(userId).emit("hi");
  // });
  // socket.on("ping", (count) => {
  //   console.log(count);
  // });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}
function disconnect() { }

module.exports = httpServer => {
  io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });
  io.on("connection", (socket) => {
    connect(socket)
    disconnect(socket)
    socket.on('join', function (req) {
      console.log(req)
      socket.join(req.room);
    });
  });
  return io
}
