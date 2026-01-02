const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', authenticate, taskController.getAllTasks);
router.post('/', authenticate, authorizeAdmin, taskController.createTask);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, authorizeAdmin, taskController.deleteTask);

module.exports = router;
