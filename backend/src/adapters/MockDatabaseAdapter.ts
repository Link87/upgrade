import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Chat } from '../models/Chat';
import { ChatMessage } from '../models/ChatMessage';
import { Offer } from '../models/offer';
import { User } from '../models/User';

function deepCopy(obj: any): any {
    return (JSON.parse(JSON.stringify(obj)));
}

// MockDatabesAdapter saves the database state in ram and is for testing purposes only
export class MockDatabaseAdapter implements IDatabaseAdapter {

    private users: User[] = [];
    private chats: Chat[] = [];
    private chatMessages: ChatMessage[] = [];
    private offers: Offer[] = [];

    public async getUserById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    public async getUserByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.loginCredentials.username === username);
    }

    public async createUser(user: User): Promise<User> {
        const clonedUser = deepCopy(user);
        this.users.push(clonedUser);
        return clonedUser;
    }

    public async updateUser(user: User): Promise<User> {
        const clonedUser = deepCopy(user);

        this.users = this.users.filter(listUser => listUser.id !== user.id);
        this.users.push(clonedUser);
        return user;
    }

    public async deleteUser(id: string): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
        return;
    }

    public async createChat(chat: Chat): Promise<Chat> {
        const lookup = this.chats.find(c => c.chatId === chat.chatId ||
            (c.userId1 === chat.userId1 && c.userId2 === chat.userId2) ||
            (c.userId1 === chat.userId2 && c.userId2 === chat.userId1));
        if (lookup === undefined) {
            this.chats.push(deepCopy(chat));
            return chat;
        } else {
            return lookup;
        }
    }

    public async deleteChat(chat: Chat): Promise<void> {
        this.chats = this.chats.filter(c => c.chatId !== chat.chatId);
        return;
    }

    public async getChatById(chatId: string): Promise<Chat | undefined> {
        return this.chats.find(chat => chat.chatId === chatId);
    }

    public async getChatsForUser(userId: string): Promise<Chat[]> {
        return this.chats.filter(chat => chat.userId1 === userId || chat.userId2 === userId);
    }

    public async getChatMessagesForChat(chatId: string): Promise<ChatMessage[] | undefined> {
        if (this.chats.find(chat => chat.chatId === chatId) === undefined) {
            return undefined;
        }
        return this.chatMessages.filter(message => message.chatId === chatId);
    }

    public async appendChatMessage(message: ChatMessage): Promise<void> {
        this.chatMessages.push(deepCopy(message));
    }

    public async setRead(userId: string, chatId: string): Promise<void> {
        const chat = this.chats.find(c => c.chatId === chatId);
        if (chat === undefined) {
            return;
        }
        this.chatMessages.filter(message => message.chatId === chatId)
            .filter(message => message.from1to2 ? chat.userId2 === userId : chat.userId1 === userId)
            .forEach(message => {
                message.unread = false;
            });
    }

    public async getOffers(): Promise<Offer[]> {
        return this.offers;
    }

    public async getOffer(id: string): Promise<Offer | null> {
        return this.offers.filter(offer => offer.id === id)[0];
    }

    public async deleteOffer(id: string) {
        this.offers = this.offers.filter(offer => id !== offer.id);
    }

    public async updateOffer(offer: Offer) {
        this.deleteOffer(offer.id);
        this.createOffer(offer);
    }

    public async createOffer(offer: Offer) {
        this.offers.push(offer);
        console.log(offer);
    }

}
