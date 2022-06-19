const express = require('express');
const router = express.Router();
const taskController = require('../controllers/sequen.task.controller');

router.post('/', taskController.addTask);
router.get('/', taskController.findTask);
router.get('/:id', taskController.findTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteById);

module.exports = router;