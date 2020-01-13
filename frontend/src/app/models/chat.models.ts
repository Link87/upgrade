export class Chat {

  constructor(public readonly chatId: string,
              public readonly userId1: string,
              public readonly userId2: string) {
  }

}

export class ChatMessage {

  constructor(public readonly messageId: string,
              public readonly chatId: string,
              public readonly from1to2: boolean,
              public readonly time: number,
              public readonly messageType: string,
              ) {
  }

}

export class TextMessage extends ChatMessage {

  constructor(messageId: string,
              chatId: string,
              from1to2: boolean,
              time: number,
              public readonly text: string,
              ) {
      super(messageId, chatId, from1to2, time, 'text' );
  }

}


export class OfferMessage extends ChatMessage {

  constructor(messageId: string,
              chatId: string,
              from1to2: boolean,
              time: number,
              public readonly offer: Offer) {
    super(messageId, chatId, from1to2, time, 'offer' );  }
}

export class Offer {
  constructor(
    public readonly title: string,
    public readonly date: string,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly location: string,
    public readonly price: string) {}
}

export class TransportTextMessage {

  constructor(public readonly chatId: string, public readonly text: string) {}

}
