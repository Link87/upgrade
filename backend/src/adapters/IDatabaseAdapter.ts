import { Chat } from '../models/Chat';
import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';

export interface IDatabaseAdapter {

    getUserById(id: string): Promise<User | undefined>;

    getUserByUsername(id: string): Promise<User | undefined>;

    createUser(user: User): Promise<User>;

    updateUser(user: User): Promise<User>;

    deleteUser(id: string): Promise<void>;

    createChat(chat: Chat): Promise<Chat>;

    deleteChat(chat: Chat): Promise<void>;

    getChatById(chatId: string): Promise<Chat | undefined>;

    getChatsForUser(userId: string): Promise<Chat[]>;

    getChatMessagesForChat(chatId: string): Promise<ChatMessage[] | undefined>;

    appendChatMessage(message: ChatMessage): Promise<void>;

}
