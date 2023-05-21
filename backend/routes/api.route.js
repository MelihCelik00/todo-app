var express = require('express');
var router = express.Router();
const authLayer = require('../middlewares/authlayer');

router.use('/auth', require('../components/auth/auth.route'));
router.use('/todo', require('../components/todo/todo.route'));

module.exports = router;
