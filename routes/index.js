var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main', { title: 'Express' });
});

/* GET main page. */
router.get('/main', function(req, res) {
  res.render('main', { title: 'Express' });
});

module.exports = router;
