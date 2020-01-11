import { ChatMessage } from '../models/ChatMessage';
import { Offer } from '../models/offer';
import { User } from '../models/User';

export interface IDatabaseAdapter {

    getUserById(id: string): Promise<User | null>;

    getUserByUsername(id: string): Promise<User | null>;

    createUser(user: User): Promise<User>;

    updateUser(user: User): Promise<User>;

    deleteUser(id: string): Promise<void>;

    getChatsForUser(userId: string): Promise<string[]>;

    getChatMessagesForChat(fistUserId: string, secondUserId: string): Promise<ChatMessage[]>;

    appendChatMessageToChat(firstUserId: string, secondUserid: string, message: ChatMessage): Promise<void>;

    subscribeToChatsForUser(userId: string, onMessage: (message: ChatMessage) => void): void;

    getOffers(): Promise<Offer[]>;

    getOffer(id: string): Promise<Offer | null>;

    deleteOffer(id: string): Promise<void>;

    updateOffer(offer: Offer): Promise<void>;

    createOffer(offer: Offer): Promise<void>;
}
