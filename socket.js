const { Server } = require("socket.io");
const { game } = require("./define");
const app = require("./app");
let io = null
function init(socket) {
  console.log('a user connected', socket.id);
  io.to("controller").to("monitor").emit("setting playing", { status: game.playing });
  io.to("controller").to("player").emit("setting voting", { status: game.voting });
  
  socket.on("count-player", function (req) {
    io.to("controller").emit("count-player", {
      player: io.sockets.adapter.rooms.get('player') ? io.sockets.adapter.rooms.get('player').size : 0,
    });
  })
  socket.on("game", function (req) {
    io.to("controller").emit("game", {
      current: game.current,
      rows: game.lists
    });
    io.to("player").emit("game", {
      current: game.current,
      row: game.lists[game.current]
    });
  })
  socket.on("vote", function (req) {
    console.log(game.lists[game.current].answer[req.index])
    game.lists[game.current].answer[req.index].score.vote++
    console.log(game.lists[game.current].answer[req.index])
    app.calculates(game.lists[game.current])
    io.to("controller").emit("vote", { current: game.current, row: game.lists[game.current], sum: game.lists[game.current].sum });
  })
  socket.on("setting playing", function (req) {
    game.playing = req.status
    console.log("DASDsa")
    io.to("controller").to("monitor").emit("setting playing", { status: game.playing });
  })
  socket.on("setting voting", function (req) {
    game.voting = req.status
    console.log("DASDsasss")
    io.to("controller").to("player").emit("setting voting", { status: game.voting });
  })
  socket.on('disconnect', () => {
    io.to("controller").emit("count-player", {
      player: io.sockets.adapter.rooms.get('player') ? io.sockets.adapter.rooms.get('player').size : 0,
    });
    console.log('user disconnected');
  });
}

module.exports = httpServer => {
  io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });
  io.on("connection", (socket) => {
    socket.on('join', function (req) {
      socket.join(req.room);
      if (req.room == "player") {
        io.to("controller").emit("count-player", {
          player: io.sockets.adapter.rooms.get('player') ? io.sockets.adapter.rooms.get('player').size : 0,
        });
      }
    });
    init(socket)
  });
  return io
}
