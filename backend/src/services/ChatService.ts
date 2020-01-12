import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Chat } from '../models/Chat';
import { ChatMessage } from '../models/ChatMessage';

export class ChatService {

    constructor (private database: IDatabaseAdapter) {}

    public async createChat(chat: Chat): Promise<void> {
        this.database.createChat(chat);
    }

    public async getChatById(chatId: string): Promise<Chat | undefined> {
        return this.database.getChatById(chatId);
    }

    public async getChatsForUser(userId: string): Promise<Chat[]> {
        return this.database.getChatsForUser(userId);
    }

    public async getChatMessagesForChat(chatId: string): Promise<ChatMessage[]> {
        return this.database.getChatMessagesForChat(chatId);
    }

    public async appendChatMessage(message: ChatMessage): Promise<void> {
        this.database.appendChatMessage(message);
    }

}
