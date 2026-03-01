const ChatService = require('../services/ChatService');

class ChatController {
    static async getChat(req, res, next) {
        try {
            const { senderId, receiverId } = req.query;
            const chat = await ChatService.getOrCreateChat(senderId, receiverId);
            res.json(chat ? chat.messages : []);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ChatController;