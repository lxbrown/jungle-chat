socketio = require('socket.io');

module.exports = (server) => {
    let socketConfig = {}
    if (process.env.NODE_ENV !== 'production') {
        socketConfig = {
            cors: {
                origin: 'http://localhost:3000'
            }
        }
    }
    
    const io = socketio(server, socketConfig)

    const { joinChat, leaveChat, sendMessage } = require('../message/events')(io);
    const { joinLaunch, leaveLaunch, refreshChannels } = require('../channel/events')(io);

    io.on('connection', (socket) => {
        console.log('connect');
        socket.on('chat:join', joinChat);
        socket.on('chat:message', sendMessage);
        socket.on('chat:leave', leaveChat);

        socket.on('launch:join', joinLaunch);
        socket.on('launch:message', leaveLaunch);

        socket.on('chat:join', refreshChannels);
        socket.on('chat:leave', refreshChannels);

        socket.on('disconnect', refreshChannels);
        socket.on('disconnect', () => { console.log('dc') });
    });

    return;
}