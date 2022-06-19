const taskDao = require('../dao/task.dao');
var taskController = {
    addTask: addTask,
    findTask: findTasks,
    findTaskById: findTaskById,
    updateTask: updateTask,
    deleteById: deleteById
}

function addTask(req, res) {
    let task = req.body;
    taskDao.create(task).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findTaskById(req, res) {
    taskDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    taskDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Task deleted successfully",
                task: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateTask(req, res) {
    taskDao.updateTask(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Task updated successfully",
                task: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findTasks(req, res) {
    taskDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = taskController;