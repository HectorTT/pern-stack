
const express = require('express');
const router = express.Router();
//const taskRoutes = require('./task.route');
const taskRoutes = require('./auth.routes');

router.use('/tasks', taskRoutes);
module.exports = router;