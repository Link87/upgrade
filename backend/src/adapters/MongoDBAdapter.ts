import { MongoClient } from 'mongodb';

import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Chat } from '../models/Chat';
import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';

export class MongoDBAdapter implements IDatabaseAdapter {
    private client: MongoClient;
    private dbName = 'upgrade';
    private collectionName = 'user';

    constructor() {
        const url = 'mongodb://localhost:27017';

        this.client = new MongoClient(url);

        this.client.connect((_err: any) => {
            console.error(_err);
        });

    }

    public async getUserById(id: string): Promise<User | undefined> {
        const user = await this.client.db(this.dbName).collection(this.collectionName).findOne({ id });
        return user;
    }

    public async getUserByUsername(username: string): Promise<User | undefined> {
        const user =
            await this.client.db(this.dbName).collection(this.collectionName).findOne({ 'profile.name': username });
        return user;
    }

    public async createUser(user: User): Promise<User> {
        this.client.db(this.dbName).collection(this.collectionName).insertOne(user);
        return user;
    }

    public async updateUser(user: User): Promise<User> {
        this.client.db(this.dbName).collection(this.collectionName).update({ id: user.id }, user);
        return user;
    }

    public async deleteUser(id: string): Promise<void> {
        this.client.db(this.dbName).collection(this.collectionName).deleteOne({ id });
        return;
    }

    public async createChat(_chat: Chat): Promise<Chat> {
        return null!;
    }

    public async deleteChat(_chat: Chat): Promise<void> {
        return;
    }

    public async getChatById(_chatId: string): Promise<Chat> {
        return null!;
    }

    public async getChatsForUser(_userId: string): Promise<Chat[]> {
       return [];
    }

    public async getChatMessagesForChat(_chatId: string): Promise<ChatMessage[] | undefined> {
        return [];
    }

    public async appendChatMessage(_message: ChatMessage): Promise<void> {
        return;
    }

}
