const express = require("express");
const {addTask, getAllTasks, updateTask, deleteTask, getRelatedTasks} = require("../controllers/TaskController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post('/add', auth, addTask)
router.get('/', auth, getAllTasks)
router.get('/related-tasks', auth, getRelatedTasks)
router.put('/:id', auth, updateTask)
router.delete('/:id', auth, deleteTask)

module.exports = router;