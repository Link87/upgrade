export class ChatMessage {

    constructor(public readonly messageId: string,
                public readonly chatId: string,
                public readonly from1to2: boolean,
                public readonly time: number,
                public readonly messageType: string,
                ) {
    }

}
