const express = require('express');
const { createDB, createTable, createList, showTodos, singleTodo, updateTodo, deleteSingleTodo } = require('../controllers/todoController');
const router = express.Router();


//jobs routes

// /api/job/create
router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);
router.get('/show/todos', showTodos);
router.delete('/delete/todo/:id', deleteSingleTodo);



module.exports = router;