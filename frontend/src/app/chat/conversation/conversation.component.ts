import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatMessage, TransportTextMessage  } from '../../models/chat.models';
import { ChatService } from '../chat.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, AfterViewInit, OnDestroy {

  writeGroup: FormGroup;

  @ViewChild('scrollable', { static: false }) private scrollable: ElementRef;
  @ViewChildren('messages') private messagesInDom: QueryList<any>;

  private messages: ChatMessage[] = [];
  private chatId = '';
  private messageSubscription: Subscription;

  constructor(private chatService: ChatService, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.messageSubscription = this.chatService.messageEvents.subscribe(isMessageEvent => {
      this.updateChatHistory();
      if (isMessageEvent && this.chatId) {
        this.chatService.setRead(this.chatId);
      }
    });
  }

  ngOnInit() {
    this.writeGroup = new FormGroup({
      message: new FormControl('', Validators.required)
    });

    this.route.queryParams.pipe(map(params => params.id as string || undefined))
      .subscribe(id => {
        this.chatId = id;
        this.updateChatHistory();
        if (this.chatId) {
          this.chatService.setRead(this.chatId);
        }
      });
  }

  ngAfterViewInit() {
    this.messagesInDom.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      if (this.scrollable !== undefined) {
        this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async onSubmit() {
    if (this.writeGroup.controls.message.value === '') {
      return;
    }
    this.chatService.send(new TransportTextMessage(this.chatId, this.writeGroup.controls.message.value));
    this.writeGroup.controls.message.setValue('');
  }

  private updateChatHistory() {
    this.messages = this.chatService.getMessagesOf(this.chatId);
  }


  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
