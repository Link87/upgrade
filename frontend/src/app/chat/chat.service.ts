import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, Subscription } from 'rxjs';
import { ChatMessage, TextMessage, TransportTextMessage } from '../models/chat.models';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  private socket: SocketIOClient.Socket;
  private subscription: Subscription;

  private messages$: Subject<ChatMessage> = new Subject<ChatMessage>();

  constructor(authService: AuthService) {
    if (authService.isAuthenticated()) {
      this.connect(authService.token);
    }
    this.subscription = authService.getObserver().subscribe(user => {
      if (authService.isAuthenticated()) {
        this.connect(user.token);
      }
    });
  }

  private connect(token: string) {
    this.socket = io(`http://${window.location.hostname}:3000?token=${token}`);
    this.socket.on('text_message', (message: TextMessage) => {
      this.messages$.next(message);
    });
  }

  public send(message: TransportTextMessage) {
    this.socket.emit('text_message', message);
  }

  get messages(): Observable<ChatMessage> {
    return this.messages$;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
