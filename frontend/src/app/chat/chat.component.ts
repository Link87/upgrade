import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatMessage, OfferMessage, TextMessage, Offer  } from '../models/chat.models';
import { ChatService } from './chat.service';

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
  userId = 'Quexten';

  constructor(private chatService: ChatService) {

    this.chatService.messageReceived().subscribe(data => {
      this.messages.push(data);
    });

    this.messages.push(new TextMessage('Quexten', 'Neo', new Date().getTime(), 'Hello'));
    this.messages.push(new TextMessage('Quexten', 'Neo', new Date().getTime(), 'What\'s up?'));
    this.messages.push(new TextMessage('Neo', 'Quexten', new Date().getTime(), 'Do you want to enter the matrix?'));
    this.messages.push(new TextMessage('Quexten', 'Neo', new Date().getTime(), 'Yes.'));
    this.messages.push(new TextMessage('Neo', 'Quexten', new Date().getTime(), 'You are the matrix!'));
    this.messages.push(new OfferMessage('Neo', 'Quexten', new Date().getTime(),
                        new Offer('Entering the Matrix', '01/01/1970', '00:00', '23:59', 'Carl Aachen', '420')));
    this.messages.push(new TextMessage('Quexten', 'Neo', new Date().getTime(), 'Won\'t work for me.'));
    this.messages.push(new TextMessage('Neo', 'Quexten', new Date().getTime(), 'Pick another date!'));
    this.messages.push(new OfferMessage('Quexten', 'Neo', new Date().getTime(),
                        new Offer('Exiting the Matrix', '01/02/1270', '04:00', '21:59', 'Carl Aachen', '39')));
  }

  ngOnInit() {
    this.writeGroup = new FormGroup({
      message: new FormControl('', Validators.required)
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
    this.chatService.send(new TextMessage(this.userId, '', new Date().getTime(), this.writeGroup.controls.message.value));
    this.writeGroup.controls.message.setValue('');
  }

}
