const { Server } = require('socket.io');
const initChatSocket = require('../socket/chatSocket');

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001'],
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }
    });

    initChatSocket(io);

    return io;
};

module.exports = initSocket;