const router = require('express').Router();

// const { AssetRegistration, AssetBorrowReturn, AssetBorrowReturnDetail, AssetAcceptCut } = require('../controller/acf/AssetRegistration');

router.all("/ready_server", async function (req, res, next) {
    // var now = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    return res.json({ now: now, client: io.engine.clientsCount });
});

module.exports = router;