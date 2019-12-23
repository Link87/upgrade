import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatMessage, OfferMessage, TextMessage, Offer  } from '../models/chat.models';
import { ChatService } from './chat.service';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  writeGroup: FormGroup;

  @ViewChild('scrollable', { static:  false }) private scrollable: ElementRef;
  @ViewChildren('messages') private messagesInDom: QueryList<any>;

  messages: ChatMessage[] = [];
  userId = '';
  receiverId = '';

  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private _route: ActivatedRoute) {
    this.chatService.messages.subscribe(data => {
      this.messages.push(data);
    });

    this.authenticationService.userId.subscribe(id => {
      this.userId = id
    })
  }

  ngOnInit() {
    this.writeGroup = new FormGroup({
      message: new FormControl('', Validators.required)
    });

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.receiverId = params.get("id")
    })
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
    this.chatService.send(new TextMessage(this.userId, this.receiverId, new Date().getTime(), this.writeGroup.controls.message.value));
    this.writeGroup.controls.message.setValue('');
  }

}
