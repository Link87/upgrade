import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ChatComponent,
    ConversationComponent,
    ChatSidebarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ChatModule { }
