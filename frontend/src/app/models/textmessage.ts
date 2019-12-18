import { ChatMessage } from './chatmessage';

export class TextMessage extends ChatMessage {

    constructor(public readonly senderId: string, public readonly receiverId: string, public readonly text: string) {
        super(senderId, receiverId, 'text');
    }

}
