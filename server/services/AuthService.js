const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    static async register({ name, email, password }) {
        if (!name || !email || !password) {
            throw { status: 400, message: 'All fields required' };
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw { status: 400, message: 'Email already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            loggedIn: true
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY_USER,
            { expiresIn: '1d' }
        );

        const { password: _, ...safeUser } = user.toObject();
        return { user: safeUser, token };
    }

    static async login({ email, password }) {
        if (!email || !password) {
            throw { status: 400, message: 'Email and password required' };
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            throw { status: 401, message: 'Invalid email or password' };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw { status: 401, message: 'Invalid email or password' };
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY_USER,
            { expiresIn: '30m' }
        );

        user.loggedIn = true;
        await user.save();

        const { password: _, ...safeUser } = user.toObject();
        return { user: safeUser, token };
    }

    static async me(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw { status: 401, message: 'Unauthorized' };
        }

        const { password: _, ...safeUser } = user.toObject();
        return safeUser;
    }

    static async logout(userId) {
        await User.findByIdAndUpdate(userId, { loggedIn: false });
    }

    static async forceLogout(userId) {
        await User.findByIdAndUpdate(userId, { loggedIn: false });
    }
}

module.exports = AuthService;