const AuthService = require('../services/AuthService');

class AuthController {
    static register = async (req, res) => {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json({ message: 'User registered successfully', ...result });
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static login = async (req, res) => {
        try {
            const result = await AuthService.login(req.body);
            res.json(result);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static me = async (req, res) => {
        try {
            const user = await AuthService.me(req.user.id);
            res.json(user);
        } catch (err) {
            res.status(err.status || 500).json({ message: err.message || 'Server error' });
        }
    };

    static logout = async (req, res) => {
        try {
            await AuthService.logout(req.user.id);
            res.json({ message: 'Logged out successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Server error during logout' });
        }
    };
}

module.exports = AuthController;
