import { ChatMessage } from './ChatMessage';

export class TextMessage extends ChatMessage {

    constructor(messageId: string,
                chatId: string,
                from1to2: boolean,
                time: number,
                public readonly text: string,
                unread: boolean = true,
                ) {
        super(messageId, chatId, from1to2, time, 'text', unread);
    }

}
