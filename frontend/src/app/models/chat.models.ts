export class ChatMessage {

    protected constructor(public readonly senderId: string,
                          public readonly receiverId: string,
                          public readonly time: number,
                          public readonly messageType: string,
                          public readonly messageId: string = '') {
    }

}

export class TextMessage extends ChatMessage {

  constructor(public readonly senderId: string,
              public readonly receiverId: string,
              public readonly time: number,
              public readonly text: string) {
      super(senderId, receiverId, time, 'text');
  }

}

export class OfferMessage extends ChatMessage {

  constructor(public readonly senderId: string,
              public readonly receiverId: string,
              public readonly time: number,
              public readonly offer: Offer) {
      super(senderId, receiverId, time, 'offer');
  }
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
