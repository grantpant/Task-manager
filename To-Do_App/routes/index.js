var express = require('express');
var router = express.Router();
// the construction function creates a new router object, called "router"
// the () runs the Router constructor

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./web/index.html', { title: 'Express' });
});

module.exports = router;
