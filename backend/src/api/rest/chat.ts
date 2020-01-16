import * as express from 'express';
import uuid = require('uuid');
import { Chat } from '../../models/Chat';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/AuthenticationService';
import { ChatService } from '../../services/ChatService';
import { UserService } from '../../services/UserService';
import ChatGateway from '../ChatGateway';
import { HttpError } from '../ErrorHandler';
import auth from './auth';

// tslint:disable: no-shadowed-variable
class ChatRoute {

    private readonly router = express.Router();

    constructor(private readonly chatService: ChatService,
                userService: UserService,
                authenticationService: AuthenticationService,
                chatGateway: ChatGateway) {

        const authentication = auth.bind(null, authenticationService);

        this.router.post('', authentication, async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const senderId = res.locals.user.id;
            const receiverId = req.query.receiverId;

            if (typeof receiverId !== 'string' || senderId === receiverId) {
                const error = new Error('Invalid receiverId: Malformed query') as HttpError;
                error.status = 400;
                return next(error);
            }

            if (userService.getUserById(receiverId) === undefined) {
                const error = new Error('Invalid receiverId: User not found') as HttpError;
                error.status = 404;
                return next(error);
            }

            const chatUuid = uuid();
            const chat = await this.chatService.createChat(new Chat(chatUuid, senderId, receiverId));

            res.status(chat.chatId === chatUuid ? 201 : 200).contentType('application/json').send(chat);

        });

        this.router.get('/:id', authentication, async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const id = req.params.id;
            const chat = await this.chatService.getChatById(id);

            if (chat === undefined) {
                const error = new Error('Chat not found') as HttpError;
                error.status = 404;
                return next(error);
            }

            const user: User = res.locals.user;
            if (chat.userId1 !== user.id && chat.userId2 !== user.id) {
                const error = new Error('Access Denied') as HttpError;
                error.status = 403;
                return next(error);
            }

            res.status(200).contentType('application/json').send(chat);
        });

        this.router.delete('/:id', authentication, async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const id = req.params.id;
            const chat = await this.chatService.getChatById(id);

            if (chat === undefined) {
                res.sendStatus(200);
                return;
            }

            const user: User = res.locals.user;
            if (chat.userId1 !== user.id && chat.userId2 !== user.id) {
                const error = new Error('Access Denied') as HttpError;
                error.status = 403;
                return next(error);
            }

            await this.chatService.deleteChat(chat);

            chatGateway.notifyClient(chat.userId1, 'delete_chat', chat);
            chatGateway.notifyClient(chat.userId2, 'delete_chat', chat);

            res.contentType('text').status(200).send();
        });

        this.router.get('/user/:id', authentication, async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const id = req.params.id;
            const chats = await this.chatService.getChatsForUser(id);

            const user: User = res.locals.user;
            if (id !== user.id) {
                const error = new Error('Access Denied') as HttpError;
                error.status = 403;
                return next(error);
            }

            res.status(200).contentType('application/json').send(chats);
        });

        this.router.get('/:id/messages', authentication, async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const id = req.params.id;
            const chat = await this.chatService.getChatById(id);

            if (chat === undefined) {
                const error = new Error('Chat not found') as HttpError;
                error.status = 404;
                return next(error);
            }

            const user: User = res.locals.user;
            if (chat.userId1 !== user.id && chat.userId2 !== user.id) {
                const error = new Error('Access Denied') as HttpError;
                error.status = 403;
                return next(error);
            }

            const messages = await this.chatService.getChatMessagesForChat(id);

            res.status(200).contentType('application/json').send(messages);
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export function chat(chatService: ChatService,
                     userService: UserService,
                     authenticationService: AuthenticationService,
                     chatGateway: ChatGateway): express.Router {
    return new ChatRoute(chatService, userService, authenticationService, chatGateway).getRouter();
}

export default chat;
