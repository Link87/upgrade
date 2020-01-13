import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatMessage, OfferMessage, TextMessage, Offer, TransportTextMessage  } from '../../models/chat.models';
import { ChatService } from '../chat.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, AfterViewInit {

  writeGroup: FormGroup;

  @ViewChild('scrollable', { static:  false }) private scrollable: ElementRef;
  @ViewChildren('messages') private messagesInDom: QueryList<any>;

  messages: ChatMessage[] = [];
  private userId = '';
  private chatId = '';

  constructor(private chatService: ChatService, private authService: AuthService, private route: ActivatedRoute) {
    this.chatService.messages.subscribe(data => {
      this.messages.push(data);
    });

    this.authService.getObserver().subscribe(user => {
      this.userId = user.userId;
    });
  }

  ngOnInit() {
    this.writeGroup = new FormGroup({
      message: new FormControl('', Validators.required)
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chatId = params.get('id');
    });
  }

  ngAfterViewInit() {
    this.messagesInDom.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
        this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  async onSubmit() {
    this.chatService.send(new TransportTextMessage(this.chatId, this.writeGroup.controls.message.value));
    this.writeGroup.controls.message.setValue('');
  }

}
