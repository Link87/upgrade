import { Server } from 'http';
import * as socketio from 'socket.io';
import * as uuid from 'uuid/v4';

import { Chat } from '../models/Chat';
import { TextMessage } from '../models/TextMessage';
import { TransportTextMessage } from '../models/TransportTextMessage';
import { User } from '../models/User';
import { AuthenticationService } from '../services/AuthenticationService';
import { ChatService } from '../services/ChatService';

export class ChatGateway {

    private sockets = new Map<string, IExtendedSocket>();

    constructor(private authentication: AuthenticationService, private chatService: ChatService) {}

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

            socket.on('text_message', async (transportMsg: TransportTextMessage) => {
                console.log(`<${transportMsg.chatId}>: ${transportMsg.text}`);
                const chat: Chat | undefined = await this.chatService.getChatById(transportMsg.chatId);
                if (chat === undefined) {
                    console.error(`Invalid chat id: ${transportMsg.chatId}`);
                    socket.emit('error', 'Invalid chat id');
                    return;
                }
                if (socket.user.id !== chat.userId1 && socket.user.id !== chat.userId2) {
                    console.error('Authorization error: message from chat-foreign user');
                    socket.emit('error', 'Authorization error');
                    return;
                }
                const senderId: string = socket.user.id === chat.userId1 ? chat.userId1 : chat.userId2;
                const receiverId: string = socket.user.id === chat.userId1 ? chat.userId2 : chat.userId1;

                const message = new TextMessage(uuid(),
                                                transportMsg.chatId,
                                                senderId === chat.userId1,
                                                new Date().getTime(),
                                                transportMsg.text);

                // TODO remove dis when frontend fully understands chat ids
                (message as any).senderId = senderId;
                (message as any).receiverId = receiverId;
                console.log(message);
                this.chatService.appendChatMessage(message);

                socket.emit('text_message', message);
                if (this.sockets.has(receiverId)) {
                    this.sockets.get(receiverId)?.emit('text_message', message);
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
