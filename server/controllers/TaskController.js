const TaskService = require("../services/TaskService");

class TaskController {
    static addTask = async (req, res) => {
        try {
            const task = await TaskService.addTask(req.body, req.user.id);
            return res.status(201).json(task);
        } catch (err) {
            return res.status(err.status || 500)
                .json({ message: err.message || 'Server error' });
        }
    };

    static getAllTasks = async (req, res) => {
        try {
            const result = await TaskService.getAllTasks(req.query);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(err.status || 500)
                .json({ message: err.message || 'Server error' });
        }
    };

    static updateTask = async (req, res) => {
        try {
            const task = await TaskService.updateTask(req.params.id, req.body);
            return res.status(200).json(task);
        } catch (err) {
            return res.status(err.status || 500)
                .json({ message: err.message || 'Server error' });
        }
    };

    static deleteTask = async (req, res) => {
        try {
            await TaskService.deleteTask(req.params.id);

            return res.status(200).json({
                success: true,
                message: 'Task deleted successfully'
            });

        } catch (err) {
            return res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static getRelatedTasks = async (req, res) => {
        try {
            const result = await TaskService.getRelatedTasks(req.user.id, req.query);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };
}

module.exports = TaskController;