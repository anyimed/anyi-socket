const router = require('express').Router();
const { io } = require("../app");
const { game } = require("../define");
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Bangkok");

router.all("/user", async function (req, res, next) {
  var now = moment().format('YYYY-MM-DD HH:mm:ss');
  return res.json({ now: now, client: io.engine.clientsCount });
});
router.all("/game/playing/:status", async function (req, res, next) {
  return res.json({ "current": req.params.status })
});
router.all("/game/voting/:status", async function (req, res, next) {
  return res.json({ "current": req.params.status })
});
router.all("/game/current", async function (req, res, next) {
  return res.json({ "current": game.current })
});
router.all("/game/data/:question/:answer", async function (req, res, next) {
  return res.json({ "score": game.lists[req.params.question].answer[req.params.answer] })
});
router.all("/game/current/:id", async function (req, res, next) {
  game.current = req.params.id
  // io.sockets.emit("game", {
  //   current: game.current,
  //   row: game.lists[game.current]
  // });
  // if (socket.rooms.has("system")) {
  //   io.to("system").emit("game", {
  //     current: game.current,
  //     rows: game.lists
  //   });
  // } 
  // if (socket.rooms.has("player")) {
  io.to("controller").to("monitor").emit("current", {
    current: game.current,
  });
  io.to("player").emit("game", {
    current: game.current,
    row: game.lists[game.current]
  });


  // }

  return res.json({ "current": game.current, "status": true })
});
module.exports = router;