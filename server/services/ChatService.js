const Chat = require('../models/ChatSchema');

class ChatService {
    static getRoomId(senderId, receiverId) {
        return [String(senderId), String(receiverId)].sort().join('_');
    }

    static async getOrCreateChat(senderId, receiverId) {
        const roomId = this.getRoomId(senderId, receiverId);
        await Chat.findOneAndUpdate(
            { roomId },
            { $setOnInsert: { participants: [senderId, receiverId], messages: [] } },
            { upsert: true }
        );
        return Chat.findOne({ roomId });
    }

    static async sendMessage(senderId, receiverId, text) {
        const roomId = this.getRoomId(senderId, receiverId);
        const message = { sender: senderId, message: text };
        await Chat.findOneAndUpdate(
            { roomId },
            { $push: { messages: message } },
            { upsert: true }
        );
        return { message, roomId };
    }
}

module.exports = ChatService;