import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat.models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  public send(message: ChatMessage) {
    this.socket.emit('chat message', message);
    console.log('message sent: ' + message);
  }

  public messageReceived() {
    const observable = new Observable<ChatMessage>(observer => {
      this.socket.on('chat message', data => {
        console.log('message received: ' + data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
