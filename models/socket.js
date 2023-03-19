const { Server } = require("socket.io");
const { game } = require("../define");
const app = require("../app");
let io = null
let interval = null
function voting_countdown() {
  let type = "voting"
  interval ? clearInterval(interval) : ''
  let vt = game.data.time.voting
  io.to("controller").to("player").to("monitor").emit("voting countdown", { t: vt, type: type });
  game.data.status = "voting countdown"
  interval = setInterval(() => {
    vt--
    if (vt <= 0) {
      interval ? clearInterval(interval) : ''
      game.data.status = "voted"
      io.to("controller").to("player").to("monitor").emit("voted", { status: game.data.status, type: type });
      return
    }
    io.to("controller").to("player").to("monitor").emit("voting countdown", { t: vt, type: type });
  }, 1000)
}
function init(socket) {
  // console.log('a user connected', socket.id);
  socket.on("start voting", function (req) {
    game.data.current = req.index
    interval ? clearInterval(interval) : ''
    let tt = game.data.time.countdown
    io.to("controller").to("player").to("monitor").emit("game countdown", { t: tt });
    io.to("player").to("monitor").emit("game", {
      current: game.data.current,
      row: game.data.lists[game.data.current]
    });
    game.data.status = "game countdown"
    interval = setInterval(() => {
      tt--
      if (tt <= 0) {
        interval ? clearInterval(interval) : ''
        io.to("controller").to("player").to("monitor").emit("voting", { status: game.data.status });
        game.data.status = "voting"
        // voting_countdown()
        return
      }
      io.to("controller").to("player").to("monitor").emit("game countdown", { t: tt });
    }, 1000)
  })
  socket.on("stop voting", function (req) {
    let type = "voting"
    io.to("controller").to("player").to("monitor").emit("voted", { status: game.data.status, type: type });
  })
  socket.on("vote", function (req) {
    game.data.lists[game.data.current].answer[req.index].score.vote++
    app.calculates(game.data.lists[game.data.current])
    io.to("controller").emit("vote", { current: game.data.current, row: game.data.lists[game.data.current], sum: game.data.lists[game.data.current].sum });
  })
  socket.on("show answer", function (req) {
    game.data.lists[req.current].answer[req.index].show = req.status
    io.to("monitor").emit("show answer", { current: req.current, index: req.index, row: game.data.lists[req.current].answer[req.index] });
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
      socket.emit("status", { status: game.data.status });
      /*---------------------------*/
      const obj = req.room == "controller" ? {
        current: game.data.current,
        rows: game.data.lists
      } : {
        current: game.data.current,
        row: game.data.lists[game.data.current]
      }
      socket.emit("game", obj);
      /*---------------------------*/
      if (req.room == "controller") {
        socket.emit("count-player", {
          player: io.sockets.adapter.rooms.get('player') ? io.sockets.adapter.rooms.get('player').size : 0,
        });
      }
    });
    init(socket)
  });
  return io
}
