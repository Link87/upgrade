import { ChatMessage } from './chatmessage';

export class OfferMessage extends ChatMessage {

    constructor(public readonly senderId: string,
                public readonly receiverId: string,
                public readonly title: string,
                public readonly date: string,
                public readonly startTime: string,
                public readonly endTime: string,
                public readonly location: string,
                public readonly price: string) {
        super(senderId, receiverId, 'offer');
    }

}
