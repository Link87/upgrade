import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Chat } from '../models/Chat';
import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';

function deepCopyUser(user: User): User {
    return (JSON.parse(JSON.stringify(user)));
}

// MockDatabesAdapter saves the database state in ram and is for testing purposes only
export class MockDatabaseAdapter implements IDatabaseAdapter {

    private users: User[] = [];
    private chats: Chat[] = [];
    private chatMessages: ChatMessage[] = [];

    public async getUserById(id: string): Promise<User | null> {
        const usersWithId = this.users.filter(user => user.id === id);

        if (usersWithId.length > 0) {
            return usersWithId[0];
        } else {
            return null;
        }
    }

    public async getUserByUsername(id: string): Promise<User | null> {
        const usersWithId = this.users.filter(user => user.id === id);

        if (usersWithId.length > 0) {
            return usersWithId[0];
        } else {
            return null;
        }
    }

    public async createUser(user: User): Promise<User> {
        const clonedUser = deepCopyUser(user);
        this.users.push(clonedUser);
        return clonedUser;
    }

    public async updateUser(user: User): Promise<User> {
        const clonedUser = deepCopyUser(user);

        this.users = this.users.filter(listUser => listUser.id !== user.id);
        this.users.push(clonedUser);
        return user;
    }

    public async deleteUser(id: string): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
        return;
    }

    public async createChat(chat: Chat): Promise<void> {
        if (this.chats.find(c => c.chatId === chat.chatId) === undefined) {
            this.chats.push(chat);
        }
    }

    public async getChatById(chatId: string): Promise<Chat | undefined> {
        return this.chats.find(chat => chat.chatId === chatId);
    }

    public async getChatsForUser(userId: string): Promise<Chat[]> {
        return this.chats.filter(chat => chat.userId1 === userId || chat.userId2 === userId);
    }

    public async getChatMessagesForChat(chatId: string): Promise<ChatMessage[]> {
        return this.chatMessages.filter(message => message.chatId === chatId);
    }

    public async appendChatMessage(message: ChatMessage): Promise<void> {
        this.chatMessages.push(message);
    }

}
