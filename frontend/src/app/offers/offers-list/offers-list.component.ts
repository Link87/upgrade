import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Offer } from '../offer';
import { OffersService } from '../offers.service';
import { switchMap, filter, delay } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from 'src/app/chat/chat.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit, OnChanges {

  private offers: Offer[] = []
  private offerSubscription: Subscription;
  @Input() offerFilter: (offer: Offer) => boolean = (offer) => true;

  constructor(private offerService: OffersService,
              private router: Router,
              private chatService: ChatService,
              private authenticationService: AuthService) {  }

  ngOnInit() {
    this.refreshOffers();
  }

  async refreshOffers() {
    this.offers = [];

    if (this.offerSubscription !== undefined) {
      this.offerSubscription.unsubscribe();
    }

    this.offerSubscription = this.offerService.getOffers().pipe(
      switchMap((input) => of(...input)),
      filter(this.offerFilter)
    ).subscribe(input => {
      this.offers.push(input);
    });
  }

  async deleteOffer(id: string) {
    this.offerService.deleteOffer(id).pipe(
      delay(50)
    ).subscribe(result => {
      this.refreshOffers();
    });
  }

  private openChat(userId: string) {
    const chat = this.chatService.getChats().find(c => c.userId1 === userId || c.userId2 === userId);
    if (chat === undefined) {
      this.chatService.createChatWith(userId).subscribe(c => {
        this.router.navigate(['chat'], { queryParams: { id: c.chatId } });
      });
    } else {
      this.router.navigate(['chat'], { queryParams: { id: chat.chatId } });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshOffers();
  }

}
