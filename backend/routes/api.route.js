var express = require('express');
var router = express.Router();
const authLayer = require('../middlewares/authlayer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To-Do App' });
});

router.use('/auth', require('../components/auth/auth.route'));
router.use('/todo', require('../components/todo/todo.route'));

module.exports = router;
