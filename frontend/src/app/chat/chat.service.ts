import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  public send(message: string) {
    this.socket.emit('chat message', message);
  }
}
