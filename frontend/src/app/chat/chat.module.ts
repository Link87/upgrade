import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';


@NgModule({
  declarations: [
    ChatComponent,
    ConversationComponent,
    ChatSidebarComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ChatModule { }
