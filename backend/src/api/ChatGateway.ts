import { Server } from 'http';
import * as socketio from 'socket.io';
import { AuthenticationService } from '../services/AuthenticationService';
import { User } from '../models/User';

export class ChatGateway {

    constructor(private authentication: AuthenticationService) {}

    public listen(server: Server) {
        const io = socketio.listen(server);

        io.use(async (socket, next) => {
            if(socket.handshake.query && socket.handshake.query.token) {
                let result = await this.authentication.authenticateToken(socket.handshake.query.token);
                if (result == null) {
                    return next(new Error('Authentication error: token invalid'));
                }
                let extSocket = socket as ExtendedSocket;
                extSocket.user = result;
            } else {
                next(new Error('Authentication error: token not found'));
            }
        }).on('connect', socket => {
            console.log('a user connected');
            let extSocket = <ExtendedSocket> socket;
            extSocket.on('chat message', msg => {
                console.log('message: ' + msg);
                io.emit('chat message', `${extSocket.user}: ${msg}`);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        return io;
    }

}

export default ChatGateway;

interface ExtendedSocket extends socketio.Socket {
    user: User
}