var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Express' });
});
module.exports = router;
