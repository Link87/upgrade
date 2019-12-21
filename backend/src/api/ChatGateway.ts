import { Server } from 'http';
import * as socketio from 'socket.io';

import { User } from '../models/User';
// import { AuthenticationService } from '../services/AuthenticationService';

export class ChatGateway {

    // constructor(/*private authentication: AuthenticationService*/) {}

    public listen(server: Server) {
        const io = socketio.listen(server);
        io.origins('*:*');

        io/*.use(async (socket, next) => {
            if (socket.handshake.query && socket.handshake.query.token) {
                const result = await this.authentication.authenticateToken(socket.handshake.query.token);
                if (result == null) {
                    return next(new Error('Authentication error: token invalid'));
                }
                const extSocket = socket as IExtendedSocket;
                extSocket.user = result;
            } else {
                next(new Error('Authentication error: token not found'));
            }
        })*/.on('connect', socket => {
            console.log('a user connected');
            const extSocket = socket as IExtendedSocket;
            extSocket.on('chat message', msg => {
                console.log('message: ' + msg);
                io.emit('chat message', msg); // `${extSocket.user}: ${msg}`);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        return io;
    }

}

export default ChatGateway;

interface IExtendedSocket extends socketio.Socket {
    user: User;
}
