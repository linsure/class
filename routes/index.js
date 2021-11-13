var express = require('express');
var router = express.Router();
var loki = require('lokijs');

var db = new loki('data.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

function databaseInitialize() {
  var bookings = db.getCollection("bookings");
  if (bookings === null) {
    bookings = db.addCollection("bookings");
  }
}
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/bookings', function (req, res) {
  let result = db.getCollection("bookings").insert(req.body);
  res.status(201).json({ id: result.$loki });
});
/* Return Number of people who choose Enjoy=yes */
router.get('/numOfyes', function (req, res) {
  var tempYes = db.getCollection("bookings").find({ enjoy: "yes" });
  var numOfyes = tempYes.length;
  console.log("Number of yes: "+numOfyes);
  return res.json(numOfyes);
});
/* Return Number of people who choose Enjoy=no */
router.get('/numOfno', function (req, res) {
  var tempNo = db.getCollection("bookings").find({ enjoy: "no" });
  var numOfno = tempNo.length;
  console.log("Number of no: "+numOfno);
  return res.json(numOfno);
});
module.exports = router;
