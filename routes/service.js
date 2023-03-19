const router = require('express').Router();
const { io } = require("../app");
const { game } = require("../define");
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Bangkok");
const fs = require('fs');
// var content = fs.writeFileSync('./json/test.json');

// console.log(content);


router.all("/save/:filename", async function (req, res, next) {
  const path = `./json/${req.params.filename}.json`
  fs.access(path, fs.F_OK, (err) => {
    let response = { status: false }
    if (err) {
      let content = JSON.stringify(game.data)
      fs.writeFile(path, content, err => {
        if (err) {
          response.err = err
        } else {
          response.status = true
        }
        return res.json(response)
      });
    } else {
      response.err = "ชื่อไฟล์ซ้ำกรุณาเปลี่ยนชื่อ"
      return res.json(response)
    }
  })
});
router.all("/edit/:filename", async function (req, res, next) {
  const path = `./json/${req.params.filename}.json`
  fs.access(path, fs.F_OK, (err) => {
    let response = { status: false }
    if (err) {
      response.err = "ชื่อไฟล์ซ้ำกรุณาเปลี่ยนชื่อ"
      return res.json(response)
    } else {

      let content = JSON.stringify(game.data)
      fs.writeFile(path, content, err => {
        if (err) {
          response.err = err
        } else {
          response.status = true
        }
        return res.json(response)
      });
    }
  })
});
router.all("/load/:filename", async function (req, res, next) {
  const path = `./json/${req.params.filename}.json`
  fs.access(path, fs.F_OK, (err) => {
    let response = { status: false }
    if (err) {
      response.err = err
      return res.json(response)
    } else {
      fs.readFile(path, 'utf8', function (err, data) {
        // Display the file content
        if (err) {
          response.err = err
        } else {
          response.status = true
          game.data = JSON.parse(data)
        }
        return res.json(response)
      });
    }
  })
});
router.all("/read/:filename", async function (req, res, next) {
  const path = `./json/${req.params.filename}`
  fs.access(path, fs.F_OK, (err) => {
    let response = { status: false }
    if (err) {
      response.err = err
      return res.json(response)
    } else {
      fs.readFile(path, 'utf8', function (err, data) {
        // Display the file content
        if (err) {
          response.err = err
        } else {
          response.status = true
          data = JSON.parse(data)
          response.data = data
        }
        return res.json(response)
      });
    }
  })
});

router.all("/votetime/:time", async function (req, res, next) {
  game.data.time.voting = req.params.time
  return res.json({ "status": true, votetime: game.data.time.voting })
});
router.all("/countdown/:time", async function (req, res, next) {
  game.data.time.countdown = req.params.time
  return res.json({ "status": true, countdown: game.data.time.countdown })
});
router.post("/game", async function (req, res, next) {
  game.data.lists = req.body.row
  return res.json({ "status": true, rows: game.data.lists })
});
router.post("/game", async function (req, res, next) {
  game.data.lists = req.body.row
  return res.json({ "status": true, rows: game.data.lists })
});
router.put("/game/:index", async function (req, res, next) {
  game.data.lists[req.params.index] = req.body.row
  return res.json({ "status": true, index: req.params.index, row: game.data.lists[req.params.index] })
});
router.delete("/game/:index", async function (req, res, next) {
  let row = game.data.lists[req.params.index]
  game.data.lists.splice(req.params.index, 1);
  return res.json({ "status": true, index: req.params.index, row: row })
});

router.all("/current/:id", async function (req, res, next) {
  game.data.current = req.params.id
  // io.sockets.emit("game", {
  //   current: game.data.current,
  //   row: game.data.lists[game.data.current]
  // });
  // if (socket.rooms.has("system")) {
  //   io.to("system").emit("game", {
  //     current: game.data.current,
  //     rows: game.data.lists
  //   });
  // } 
  // if (socket.rooms.has("player")) {
  // io.to("controller").emit("current", {
  //   current: game.data.current,
  // });
  io.to("player").to("monitor").emit("game", {
    current: game.data.current,
    row: game.data.lists[game.data.current]
  });
  // }
  return res.json({ "current": game.data.current, "status": true })
});
module.exports = router;