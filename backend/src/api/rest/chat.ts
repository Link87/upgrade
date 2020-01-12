import * as express from 'express';
import { ChatService } from '../../services/ChatService';

class ChatRoute {

    private readonly router = express.Router();

    constructor(private readonly chatService: ChatService) {

        this.router.get('/user/:id/chats', async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;
            const chats = await this.chatService.getChatsForUser(id);

            res.status(200).contentType('application/json').send(chats);
        });

        this.router.get(':id/messages', async (
            req: express.Request,
            res: express.Response) => {
            const id = req.params.id;
            const messages = await this.chatService.getChatMessagesForChat(id);

            res.status(200).contentType('application/json').send(messages);
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export function chat(chatService: ChatService): express.Router {
    return new ChatRoute(chatService).getRouter();
}

export default chat;
