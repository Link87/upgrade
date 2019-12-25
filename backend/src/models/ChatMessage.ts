export class ChatMessage {

    constructor(public readonly senderId: string,
                public readonly receiverId: string,
                public readonly time: number,
                public readonly messageType: string,
                public messageId: string) {
    }

}
