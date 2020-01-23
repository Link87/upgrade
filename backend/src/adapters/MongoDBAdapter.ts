import { MongoClient } from 'mongodb';

import { IDatabaseAdapter } from '../adapters/IDatabaseAdapter';
import { Chat } from '../models/Chat';
import { ChatMessage } from '../models/ChatMessage';
import { Offer } from '../models/offer';
import { User } from '../models/User';

export class MongoDBAdapter implements IDatabaseAdapter {
    private client: MongoClient | undefined;
    private dbName = 'upgrade';
    private userCollection = 'user';
    private offerCollection = 'offers';
    private url = 'mongodb://localhost:27017';

    public async connect () {
        this.client = await MongoClient.connect(this.url);
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const user = await this.client!.db(this.dbName).collection(this.userCollection).findOne({ id });
        return user;
    }

    public async getUserByUsername(username: string): Promise<User | undefined> {
        const user =
            await this.client!.db(this.dbName).collection(this.userCollection).findOne({ 'profile.name': username });
        return user;
    }

    public async createUser(user: User): Promise<User> {
        this.client!.db(this.dbName).collection(this.userCollection).insertOne(user);
        return user;
    }

    public async updateUser(user: User): Promise<User> {
        this.client!.db(this.dbName).collection(this.userCollection).update({ id: user.id }, user);
        return user;
    }

    public async deleteUser(id: string): Promise<void> {
        this.client!.db(this.dbName).collection(this.userCollection).deleteOne({ id });
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

    public async setRead(_userId: string, _chatId: string): Promise<void> {
        return;
    }

    public async getOffers(): Promise<Offer[]> {
        return this.client!.db(this.dbName).collection(this.offerCollection).find({}).toArray();
    }

    public async getOffer(id: string): Promise<Offer | null> {
        return this.client!.db(this.dbName).collection(this.offerCollection).findOne({ id });
    }

    public async deleteOffer(id: string): Promise<void> {
        await this.client!.db(this.dbName).collection(this.offerCollection).deleteOne({ id });
    }

    public async updateOffer(offer: Offer): Promise<void> {
        await this.client!.db(this.dbName).collection(this.offerCollection).updateOne({ id: offer.id }, offer);
    }

    public async createOffer(offer: Offer): Promise<void> {
        await this.client!.db(this.dbName).collection(this.offerCollection).insertOne(offer);
    }

}
