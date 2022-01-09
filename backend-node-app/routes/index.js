var express = require('express');
var router = express.Router();

var usersRouter = require('./users');
router.use('/users', usersRouter);
//router.use('/user', user);

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
