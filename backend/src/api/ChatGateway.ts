import { Server } from 'http';
import * as socketio from 'socket.io';

export class ChatGateway {

    public listen(server: Server) {
        const io = socketio.listen(server);

        io.on('connect', socket => {
            console.log('a user connected');
            socket.on('chat message', msg => {
                console.log('message: ' + msg);
                io.emit('chat message', msg);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        return io;
    }

}

export default ChatGateway;
