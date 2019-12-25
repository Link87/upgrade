import { ChatMessage } from './ChatMessage';

export class TextMessage extends ChatMessage {

    constructor(public readonly senderId: string,
                public readonly receiverId: string,
                public readonly time: number,
                public readonly text: string,
                public messageId: string) {
        super(senderId, receiverId, time, 'text', messageId);
    }

}
