import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chat } from 'src/app/models/chat.models';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit {

  userId = '';
  chats: Chat[] = [];

  constructor(private readonly chatService: ChatService, private readonly authService: AuthService) {
    chatService.getChatsOfUser(authService.user.userId).subscribe((chats: Chat[]) => this.chats = chats);
    this.chatService.messages.subscribe(data => {
      // TODO update views
    });

    this.authService.getObserver().subscribe(user => {
      this.userId = user.userId;
    });
  }

  ngOnInit() {
  }

}
