import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';

function deepCopyUser(user: User): User {
    return (JSON.parse(JSON.stringify(user)));
}

// MockDatabesAdapter saves the database state in ram and is for testing purposes only
export class MockDatabaseAdapter implements IDatabaseAdapter {

    private users: User[] = [];
    private chats: Map<string, Map<string, ChatMessage[]>> = new Map<string, Map<string, ChatMessage[]>>();
    // tslint:disable-next-line: max-line-length
    private chatListeners: Map<string, Array<(message: ChatMessage) => void>> = new Map<string, Array<(message: ChatMessage) => void>>();

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

    public async getChatsForUser(userId: string): Promise<string[]> {
        if (!this.chats.has(userId)) {
            this.chats.set(userId, new Map<string, ChatMessage[]>());
        }

        return Array.from(this.chats.get(userId)!.keys());
    }

    public async getChatMessagesForChat(firstUserId: string, secondUserId: string): Promise<ChatMessage[]> {
        if (!this.chats.has(firstUserId)) {
            this.chats.set(firstUserId, new Map<string, ChatMessage[]>());
            if (!this.chats.get(firstUserId)!.has(secondUserId)) {
                this.chats.get(firstUserId)!.set(secondUserId, []);
            }
        }
        if (!this.chats.has(secondUserId)) {
            this.chats.set(secondUserId, new Map<string, ChatMessage[]>());
            if (!this.chats.get(secondUserId)!.has(firstUserId)) {
                this.chats.get(secondUserId)!.set(firstUserId, []);
            }
        }

        return this.chats.get(firstUserId)!.get(secondUserId)!;
    }

    public async appendChatMessageToChat(firstUserId: string,
                                         secondUserId: string,
                                         message: ChatMessage): Promise<void> {
        if (!this.chats.has(firstUserId)) {
            this.chats.set(firstUserId, new Map<string, ChatMessage[]>());
            if (!this.chats.get(firstUserId)!.has(secondUserId)) {
                this.chats.get(firstUserId)!.set(secondUserId, []);
            }
        }
        if (!this.chats.has(secondUserId)) {
            this.chats.set(secondUserId, new Map<string, ChatMessage[]>());
            if (!this.chats.get(secondUserId)!.has(firstUserId)) {
                this.chats.get(secondUserId)!.set(firstUserId, []);
            }
        }

        this.chats.get(firstUserId)!
            .get(secondUserId)!
            .push(message);
        this.chats.get(secondUserId)!
            .get(firstUserId)!
            .push(message);

        this.chatListeners.get(firstUserId)!.forEach(callback => callback(message));
        this.chatListeners.get(secondUserId)!.forEach(callback => callback(message));
    }

    public async subscribeToChatsForUser(userId: string, onMessage: (message: ChatMessage) => void): Promise<void> {
        if (!this.chatListeners.has(userId)) {
            this.chatListeners.set(userId, []);
        }

        this.chatListeners.get(userId)!.push(onMessage);
    }

}
