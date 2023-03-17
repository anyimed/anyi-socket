const router = require('express').Router();
const { io } = require("../app");
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Bangkok");
// const { AssetRegistration, AssetBorrowReturn, AssetBorrowReturnDetail, AssetAcceptCut } = require('../controller/acf/AssetRegistration');

router.all("/status", async function (req, res, next) {
    // var now = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    let player = io.sockets.adapter.rooms.get('player').size
    let controller = io.sockets.adapter.rooms.get('controller').size
    let monitor = io.sockets.adapter.rooms.get('monitor').size
    return res.json({ now: now, client: io.engine.clientsCount, player: player, controller, controller, monitor: monitor });
});

module.exports = router;