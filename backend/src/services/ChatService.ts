import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { ChatMessage } from '../models/ChatMessage'

export class ChatService {

    constructor (private database: IDatabaseAdapter) {
    }

    public async subscribeToChat(userId: string, onMessage: (message: ChatMessage) => any) {
       this.database.subscribeToChatsForUser(userId, onMessage);
    }

    public async sendChatMessage(message: ChatMessage) {
        this.database.appendChatMessageToChat(message.senderId, message.receiverId, message);
    }

    public async getChatMessagesForChat(fistUserId: string, secondUserId: string): Promise<ChatMessage[]> {
        
    }


}
