const Task = require('../models/TaskSchema');

class TaskService {
    static async addTask({title, description, assignedTo}, userId) {
        if (!title || !assignedTo) {
            throw {status: 400, message: 'Title and assignedTo are required'};
        }

        const task = new Task({
            title,
            description,
            assignedTo,
            createdBy: userId
        });

        await task.save();
        return task;
    }

    static async getAllTasks({page, limit}) {
        const parsedPage = Math.max(Number(page) || 1, 1);
        const parsedLimit = Math.max(Number(limit) || 10, 1);
        const skip = (parsedPage - 1) * parsedLimit;

        const [tasks, total] = await Promise.all([
            Task.find()
                .populate('createdBy', 'name email')
                .populate('assignedTo', 'name email')
                .sort({createdAt: -1})
                .skip(skip)
                .limit(parsedLimit),

            Task.countDocuments()
        ]);

        return {
            tasks,
            currentPage: parsedPage,
            totalPages: Math.ceil(total / parsedLimit),
            totalTasks: total
        };
    }

    static async updateTask(id, data) {
        const task = await Task.findByIdAndUpdate(id, data, {new: true});

        if (!task) {
            throw {status: 404, message: 'Task not found'};
        }

        return task;
    }

    static async deleteTask(id) {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            throw {status: 404, message: 'Task not found'};
        }
    }

    static async getRelatedTasks(id, { page, limit, type }) {
        const parsedPage = Math.max(Number(page) || 1, 1);
        const parsedLimit = Math.max(Number(limit) || 10, 1);
        const skip = (parsedPage - 1) * parsedLimit;

        let filter = {};

        if (type === "created") {
            filter = { createdBy: id };
        } else if (type === "assigned") {
            filter = { assignedTo: id };
        } else {
            filter = {
                $or: [
                    { createdBy: id },
                    { assignedTo: id }
                ]
            };
        }

        const [tasks, total] = await Promise.all([
            Task.find(filter)
                .populate('createdBy', 'name email')
                .populate('assignedTo', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parsedLimit),

            Task.countDocuments(filter)
        ]);

        return {
            tasks,
            currentPage: parsedPage,
            totalPages: Math.ceil(total / parsedLimit),
            totalTasks: total
        };
    }}

module.exports = TaskService;