import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chat, ChatMessage } from 'src/app/models/chat.models';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

type ChatPreview = Chat & { lastMessage: ChatMessage | undefined };

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit, OnDestroy {

  private messageSubscription: Subscription;

  activeChatId = '';
  chats: ChatPreview[] | undefined = undefined;

  constructor(private readonly chatService: ChatService,
              private readonly authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

    this.updateChats();
    this.messageSubscription = this.chatService.messageEvents.subscribe(_ => {
      this.updateChats();
    });
  }

  ngOnInit() {
    this.route.queryParams.pipe(map(params => params.id as string || undefined))
      .subscribe(id => {
        this.checkActiveChatId(id);
        this.activeChatId = id;
      });
  }

  private updateChats() {
    const chats = this.chatService.getChats();
    if (chats === undefined) {
      return;
    }
    for (const chat of chats) {
      const messages = this.chatService.getMessagesOf(chat.chatId);
      const lastMessage = messages !== undefined && messages.length > 0 ?
          messages[messages.length - 1] : undefined;
      (chat as ChatPreview).lastMessage = lastMessage;
    }
    chats.sort((c1: ChatPreview, c2: ChatPreview) => {
      if (c1.lastMessage === undefined && c2.lastMessage === undefined) {
        return 0;
      } else if (c1.lastMessage !== undefined && c2.lastMessage === undefined) {
        return -1;
      } else if (c1.lastMessage === undefined && c2.lastMessage !== undefined) {
        return 1;
      } else if (c1.lastMessage.time > c2.lastMessage.time) {
        return -1;
      } else if (c1.lastMessage.time < c2.lastMessage.time) {
        return 1;
      } else {
        return 0;
      }
    });
    this.chats = chats as ChatPreview[];
    this.checkActiveChatId(this.route.snapshot.queryParams.id);
  }

  private checkActiveChatId(id: string) {
    /*if (this.chats !== undefined && this.chats.find(c => c.chatId === id) === undefined) {
      this.router.navigate([],
        {
          relativeTo: this.route,
          queryParams: { id: null },
          queryParamsHandling: 'merge'
        });
    }*/
  }

  onDelete() {
    this.chatService.deleteChat(this.activeChatId);
    this.router.navigate(['/chat']);
  }

  onReadAll() {
    this.chatService.setRead();
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

}
