const router = require('express').Router();
const { io } = require("../app");
const { game } = require("../define");
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Bangkok");

router.all("/user", async function (req, res, next) {
  var now = moment().format('YYYY-MM-DD HH:mm:ss');
  return res.json({ now: now, client: io.engine.clientsCount });
});
router.all("/game/current", async function (req, res, next) {
  return res.json({ "current": game.current + 1 })
});
router.all("/game/data/:question/:answer", async function (req, res, next) {
  // console.log(req.params.question)
  console.log(game.lists[req.params.question].answer[req.params.answer])
  
  return res.json({ "score": game.lists[req.params.question].answer[req.params.answer] })
});
router.all("/game/current/:id", async function (req, res, next) {
  game.current = parseInt(req.params.id) - 1
  // io.sockets.emit("res-game", {
  //   current: game.current + 1,
  //   row: game.lists[game.current]
  // });
  // if (socket.rooms.has("system")) {
  //   io.to("system").emit("res-game", {
  //     current: game.current + 1,
  //     rows: game.lists
  //   });
  // } 
  // if (socket.rooms.has("player")) {
  io.to("system").emit("res-current", {
    current: game.current + 1,
  });
  io.to("player").emit("res-game", {
    current: game.current + 1,
    row: game.lists[game.current]
  });


  // }

  return res.json({ "current": game.current + 1, "status": true })
});
module.exports = router;