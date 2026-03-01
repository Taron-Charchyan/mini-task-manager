const TaskService = require('../services/TaskService');

class TaskController {
    static addTask = async (req, res) => {
        try {
            const task = await TaskService.addTask(req.body, req.user.id);
            res.status(201).json(task);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static getAllTasks = async (req, res) => {
        try {
            const result = await TaskService.getAllTasks(req.query);
            res.json(result);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static updateTask = async (req, res) => {
        try {
            const task = await TaskService.updateTask(req.params.id, req.body);
            res.json(task);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static deleteTask = async (req, res) => {
        try {
            await TaskService.deleteTask(req.params.id);
            res.json({ message: 'Task deleted' });
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };
}

module.exports = TaskController;