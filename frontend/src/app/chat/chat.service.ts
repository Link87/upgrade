import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, Subscription } from 'rxjs';
import { Chat, ChatMessage, TextMessage, TransportTextMessage } from '../models/chat.models';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile';

type ExtendedChat = Chat & { profile1: Profile, profile2: Profile };

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  private socket: SocketIOClient.Socket = undefined;
  private subscription: Subscription;

  private chats: ExtendedChat[] | undefined = undefined;
  private chatMessages: Map<string, ChatMessage[]> = new Map();

  private messages$: Subject<boolean> = new Subject();

  private userId: string | undefined = undefined;

  private readonly apiPath = `http://${window.location.hostname}:3000/api/v1/chat`;

  constructor(private readonly http: HttpClient, private readonly profileService: ProfileService, authService: AuthService) {
    console.log('Service created');
    if (authService.isAuthenticated()) {
      this.userId = authService.user.userId;
      this.connect(authService.token);
      this.initializeData();
    }
    this.subscription = authService.getObserver().subscribe(user => {
      if (authService.isAuthenticated()) {
        this.userId = authService.user.userId;
        this.disconnect();
        this.connect(user.token);
        this.initializeData();
      } else {
        this.userId = undefined;
        this.disconnect();
        this.chats = undefined;
        this.chatMessages.clear();
        this.messages$.next(true);
      }
    });
  }

  private connect(token: string) {
    this.socket = io(`http://${window.location.hostname}:3000?token=${token}`);
    this.socket.on('text_message', (message: TextMessage) => {
      if (this.chatMessages.get(message.chatId) === undefined) {
        this.fetchChat(message.chatId).subscribe(chat => {
          this.initializeChat(chat);
        });
        return;
      }
      this.chatMessages.get(message.chatId).push(message);
      this.messages$.next(true);
    });
    this.socket.on('delete_chat', (chat: Chat) => {
      if (this.chats === undefined) {
        return;
      }
      this.chats = this.chats.filter(c => c.chatId !== chat.chatId);
      this.chatMessages.delete(chat.chatId);
      this.messages$.next(true);
    });
  }

  private disconnect() {
    if (this.socket != null) {
      this.socket.close();
    }
  }

  public send(message: TransportTextMessage) {
    this.socket.emit('text_message', message);
  }

  private initializeData() {
    this.fetchChatsOf(this.userId)
        .subscribe((chats: Chat[]) => {
          for (const chat of chats) {
            this.initializeChat(chat as ExtendedChat);
          }
        });
  }

  private initializeChat(chat: Chat) {
    this.profileService.getProfile(chat.userId1).subscribe(profile1 => {
      this.profileService.getProfile(chat.userId2).subscribe(profile2 => {
        (chat as ExtendedChat).profile1 = profile1;
        (chat as ExtendedChat).profile2 = profile2;
        this.chats = this.chats === undefined ? [] : this.chats;
        const ex = this.chats.findIndex(c => c.chatId === chat.chatId);
        if (ex !== -1) {
          this.chats[ex] = chat as ExtendedChat;
        } else {
          this.chats.push(chat as ExtendedChat);
        }
        this.fetchMessagesOf(chat.chatId).subscribe(messages => {
          this.chatMessages.set(chat.chatId, messages);
          this.messages$.next(true);
        });
      });
    });
  }

  private fetchChat(chatId: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiPath}/${chatId}`);
  }

  private fetchMessagesOf(chatId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiPath}/${chatId}/messages`);
  }

  private fetchChatsOf(userId: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiPath}/user/${userId}`);
  }

  public deleteChat(chatId: string): void {
    this.http.delete<void>(`${this.apiPath}/${chatId}`).subscribe(_ => {
      this.chats = this.chats.filter(c => c.chatId === chatId);
      this.chatMessages.delete(chatId);
      this.messages$.next(true);
    }, console.error);
  }

  public getMessagesOf(chatId: string): ChatMessage[] | undefined {
    return this.chatMessages.get(chatId);
  }

  public getChats(): Chat[] | undefined {
    return this.chats;
  }

  public getReceiverOfChat(chat: Chat): string {
    return chat.userId1 === this.userId ?
        (chat as ExtendedChat).profile2.name : (chat as ExtendedChat).profile1.name;
  }

  public getUnreadCount(chat?: Chat): number {
    const messages = chat === undefined ?
        Array.prototype.concat.apply([], Array.from(this.chatMessages.values())) as ChatMessage[] :
        this.chatMessages.get(chat.chatId);

    return messages.filter(message => !this.isMessageSentByMyself(message) && message.unread)
      .reduce<number>((acc: number) => acc + 1, 0);
  }

  public setRead(chatId?: string): void {
    const messages = chatId === undefined ?
        Array.prototype.concat.apply([], Array.from(this.chatMessages.values())) as ChatMessage[] :
        this.chatMessages.get(chatId);

    if (messages === undefined) {
      return;
    }

    messages.forEach(message => message.unread = false);
    this.messages$.next(false);
    if (chatId === undefined) {
      this.socket.emit('read_all');
    } else {
      this.socket.emit('read', chatId);
    }
  }

  public isMessageSentByMyself(message: ChatMessage): boolean {
    return this.getSenderOfMessage(message) === this.userId;
  }

  public getSenderOfMessage(message: ChatMessage): string {
    if (this.chats === undefined) {
      return '';
    }
    const chat = this.chats.find(c => c.chatId === message.chatId);
    return message.from1to2 ?
      (chat as ExtendedChat).profile1.name : (chat as ExtendedChat).profile2.name;
  }

  public getReceiverOfMessage(message: ChatMessage): string {
    if (this.chats === undefined) {
      return '';
    }
    const chat = this.chats.find(c => c.chatId === message.chatId);
    return message.from1to2 ?
        (chat as ExtendedChat).profile2.name : (chat as ExtendedChat).profile1.name;
  }

  public get messageEvents(): Observable<boolean> {
    return this.messages$;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public startChat(userId: string) {
    return; // TODO
  }

}
