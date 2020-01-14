import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chat } from 'src/app/models/chat.models';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit {

  activeChatId = '';
  chats: Chat[] | undefined = undefined;

  userId = '';

  constructor(private readonly chatService: ChatService,
              private readonly authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    chatService.getChatsOfUser(authService.user.userId).subscribe((chats: Chat[]) => {
      this.chats = chats;
      this.checkActiveChatId(this.route.snapshot.queryParams.id);
    });
    this.chatService.messages.subscribe(data => {
      // TODO update views
    });

    this.authService.getObserver().subscribe(user => {
      this.userId = user === undefined ? undefined : user.userId;
    });
  }

  ngOnInit() {
    this.route.queryParams.pipe(map(params => params.id as string || undefined))
      .subscribe(id => {
        console.log(id);

        this.checkActiveChatId(id);
        this.activeChatId = id;
      });
  }

  private checkActiveChatId(id: string) {
    if (this.chats !== undefined && this.chats.find(c => c.chatId === id) === undefined) {
      this.router.navigate([],
        {
          relativeTo: this.route,
          queryParams: { id: null },
          queryParamsHandling: 'merge'
        });
    }
  }

}
