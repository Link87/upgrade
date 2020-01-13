import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, Subscription } from 'rxjs';
import { Chat, ChatMessage, TextMessage, TransportTextMessage } from '../models/chat.models';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  private socket: SocketIOClient.Socket;
  private subscription: Subscription;

  private messages$: Subject<ChatMessage> = new Subject<ChatMessage>();

  private readonly apiPath = `http://${window.location.hostname}:3000/api/v1/chat`;

  constructor(private http: HttpClient, authService: AuthService) {
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

  public get messages(): Observable<ChatMessage> {
    return this.messages$;
  }

  public getChat(chatId: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiPath}/${chatId}`);
  }

  public getChatMessagesOfChat(chatId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiPath}/${chatId}/messages`);
  }

  public getChatsOfUser(userId: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiPath}/user/${userId}`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
