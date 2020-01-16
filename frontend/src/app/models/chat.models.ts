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
              public unread: boolean = true,
              ) {
  }

}

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

export class TransportTextMessage {

  constructor(public readonly chatId: string, public readonly text: string) {}

}
