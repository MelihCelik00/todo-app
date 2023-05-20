const express = require('express');
const router = express.Router();
const todoController = require('./todo.controller');

router.get('/:id', todoController.getTodo);
router.post('/:id', todoController.createTodo);

module.exports = router;