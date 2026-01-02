const taskService = require('../services/task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body, req.user.id);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body, req.user.id, req.user.role);
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const result = await taskService.deleteTask(req.params.id, req.user.id, req.user.role);
        res.json(result);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
