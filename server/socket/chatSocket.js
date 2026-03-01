const ChatService = require('../services/ChatService');

const initChatSocket = (io) => {
    io.on('connection', (socket) => {
        socket.on('join_chat', async ({ senderId, receiverId }) => {
            const chat = await ChatService.getOrCreateChat(senderId, receiverId);
            const roomId = ChatService.getRoomId(senderId, receiverId);
            socket.join(roomId);
            socket.emit('chat_history', chat.messages);
        });

        socket.on('send_message', async ({ senderId, receiverId, text }) => {
            const { message, roomId } = await ChatService.sendMessage(senderId, receiverId, text);
            io.to(roomId).emit('new_message', message);
        });
    });
};

module.exports = initChatSocket;
