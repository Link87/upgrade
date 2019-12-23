import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { ChatMessage, TextMessage } from '../models/chat.models';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})  
export class ChatService {

  private socket: SocketIOClient.Socket;
  private messageObservable: Subject<ChatMessage> = new Subject<ChatMessage>()

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.token.subscribe(token => {
      this.socket = io('http://localhost:3000?token=' + token);
      this.socket.on('text-message', (message: TextMessage) => {
        this.messageObservable.next(message)
      })
    })
  }

  public send(message: TextMessage) {
    this.socket.emit('text-message', message);
  }

  get messages(): Observable<ChatMessage> {
    return this.messageObservable;
  }

}
