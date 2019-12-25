import { Server } from 'http';
import * as socketio from 'socket.io';
import * as uuid from 'uuid/v4';

import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';
import { AuthenticationService } from '../services/AuthenticationService';

export class ChatGateway {

    private sockets = new Map<string, IExtendedSocket>();

    constructor(private authentication: AuthenticationService) {}

    public listen(server: Server) {
        const io = socketio.listen(server);
        io.origins('*:*');
        console.log(this.authentication);
        io.use(async (socket, next) => {
            if (socket.handshake.query && socket.handshake.query.token) {
                const result = await this.authentication.authenticateToken(socket.handshake.query.token);
                if (result == null) {
                    return next(new Error('Authentication error: token invalid'));
                }
                const extSocket = socket as IExtendedSocket;
                extSocket.user = result;
                next();
            } else {
                next(new Error('Authentication error: token not found'));
            }
        });

        io.on('connection', (socket: IExtendedSocket) => {
            console.log(`Socket connection from ${socket.user.id}`);
            this.sockets.set(socket.user.id, socket);

            socket.on('text_message', (message: ChatMessage) => {
                if (message.senderId !== socket.user.id) {
                    console.error('incorrect sender id detected');
                    return;
                }

                message.messageId = uuid();
                socket.emit('text_message', message);
                if (this.sockets.has(message.receiverId)) {
                    this.sockets.get(message.receiverId)?.emit('text_message', message);
                }
            });
        });

        return io;
    }

}

export default ChatGateway;

interface IExtendedSocket extends socketio.Socket {
    user: User;
}
