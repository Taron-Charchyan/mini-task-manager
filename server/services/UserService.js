const User = require('../models/UserSchema');

class UserService {
    static async getUser(userId) {
        if (!userId) {
            throw { status: 401, message: 'Unauthorized' };
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }

        return user;
    }

    static async getLoggedInUsers(excludeId) {
        return User.find({ loggedIn: true, _id: { $ne: excludeId } }).select('-password');
    }

    static async getAllUsers() {
        return User.find({}).select('-password');
    }
}

module.exports = UserService;