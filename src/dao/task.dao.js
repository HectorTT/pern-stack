const Task = require('../models/task_model');
var taskDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateTask: updateTask
}

function findAll() {
    return Task.findAll();
}

function findById(id) {
    return Task.findByPk(id);
}

function deleteById(id) {
    return Task.destroy({ where: { id: id } });
}

function create(task) {
    var newTask = new Task(task);
    return newTask.save();
}

function updateTask(task, id) {
    var updateTask = {
        title: task.title,
        technologies: task.description
    };
    return Task.update(updateTask, { where: { id: id } });
}
module.exports = taskDao;