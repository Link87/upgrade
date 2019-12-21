import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatMessage } from '../models/chatmessage';
import { TextMessage } from '../models/textmessage';
import { OfferMessage } from '../models/offermessage';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  writeGroup: FormGroup;

  messages: ChatMessage[] = [];
  userId = 'Quexten';

  constructor(private chatService: ChatService) {
   /*this.messages.push(new TextMessage('Quexten', 'Neo', 'Hello'));
   this.messages.push(new TextMessage('Quexten', 'Neo', 'What\'s up?'));
   this.messages.push(new TextMessage('Neo', 'Quexten', 'Do you want to enter the matrix?'));
   this.messages.push(new TextMessage('Quexten', 'Neo', 'Yes.'));
   this.messages.push(new TextMessage('Neo', 'Quexten', 'You are the matrix!'));
   this.messages.push(new OfferMessage('Neo', 'Quexten', 'Entering the Matrix', '01/01/1970', '00:00', '23:59', 'Carl Aachen', '420'));
   this.messages.push(new TextMessage('Quexten', 'Neo', 'Won\'t work for me.'));
   this.messages.push(new TextMessage('Neo', 'Quexten', 'Pick another date!'));
   this.messages.push(new OfferMessage('Quexten', 'Neo', 'Exiting the Matrix', '01/02/1270', '04:00', '21:59', 'Carl Aachen', '39'));*/
  }

  ngOnInit() {
    this.writeGroup = new FormGroup({
      message: new FormControl()
     });
  }

  async onSubmit() {
    this.chatService.send(this.writeGroup.controls.message.value);
  }

}
