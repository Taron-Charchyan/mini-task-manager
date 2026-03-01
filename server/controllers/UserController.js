const UserService = require('../services/UserService');

class UserController {
    static user = async (req, res) => {
        try {
            const user = await UserService.getUser(req.userId);
            res.json(user);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static loggedIn = async (req, res) => {
        try {
            const users = await UserService.getLoggedInUsers(req.user.id);
            res.json(users);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static allUsers = async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };
}

module.exports = UserController;