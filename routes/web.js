const router = require('express').Router();
const { io } = require("../app");
const { game } = require("../define");
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Bangkok");
// const { AssetRegistration, AssetBorrowReturn, AssetBorrowReturnDetail, AssetAcceptCut } = require('../controller/acf/AssetRegistration');
const fs = require('fs');

router.all("/status", async function (req, res, next) {
  // var now = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
  var now = moment().format('YYYY-MM-DD HH:mm:ss');
  let player = io.sockets.adapter.rooms.get('player') ? io.sockets.adapter.rooms.get('player').size : 0
  let controller = io.sockets.adapter.rooms.get('controller') ? io.sockets.adapter.rooms.get('controller').size : 0
  let monitor = io.sockets.adapter.rooms.get('monitor') ? io.sockets.adapter.rooms.get('monitor').size : 0
  let gamelist = ``
  let file_element = ``
  await fs.readdir(`./json/`, function (err, files) {
    if (err) {
      file_element = `<tr>td colspan=9>Could not list the directory.${err} </td></tr>`;
    }
    else {
      files.forEach(function (file, index) {
        file_element += `<tr><td colspan=9><a href="../../service/read/${file}" target="blank">${file}</a></td></tr>`
      });
    }
    game.data.lists.forEach((v, i) => {
      let list = ``
      let total = 0
      v.answer.forEach((v2, i2) => {
        total += parseFloat(v2.score.percent2digit);
        list += `<li class="list-group-item">${i2} : ${v2.text}<span style="float:right">คะแนน : ${v2.score.default} | ${v2.score.vote} ( รวม ${v2.score.total} | ${v2.score.percent2digit}%)</span></li>`
      })
      list += `<li class="list-group-item">รวมเปอร์เซ็น<span style="float:right">${total.toFixed(0)}%</span></li>`
      gamelist += `<div class="col-12">
									<div class="card" >
										<div class="card-body">
											<h5 class="card-title">${i} : ${v.question}</h5>
											<ul class="list-group">${list}</ul>
										</div>
									</div>
								</div>`
    })

    let html = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Status</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </head>
        <body>
          <div class="container">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th rowspan=2>วันที่ข้อมูล</th>
                  <th colspan=4>การเชื่อมต่อ</th>
                  <th colspan=4>เกมส์</th>
                  
                </tr>
                <tr>
                  <th>ผู้ใช้งาน</th>
                  <th>เครื่องควบคุม</th>
                  <th>มอนิเตอร์</th>
                  <th>ทั้งหมด</th>
                  <th>เกมส์ปัจุบัน</th>
                  <th>countdown time</th>
                  <th>vote time</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>${now}</td>
                    <td>${player}</td>
                    <td>${controller}</td>
                    <td>${monitor}</td>
                    <td>${io.engine.clientsCount}</td>
                    <td>${parseInt(game.data.current) + 1}</td>
                    <td>${game.data.time.countdown}</td>
                    <td>${game.data.time.voting}</td>
                    <td>${game.data.status ? game.data.status : '-'}</td>
                  </tr>
                  <tr>
                    <td colspan=9>Storage files</td>
                  </tr>
                  ${file_element}
              </tbody>
            </table>
          </div>
          <div class="container">
            <div class="row">
                ${gamelist}
            </div>
          </div></div>
        </body>
      </html>
      <script>
      setTimeout(()=>{window.location.reload()},1000)
      
      </script>
    `
    // console.log(html)
    return res.send(html);
  });

});

module.exports = router;