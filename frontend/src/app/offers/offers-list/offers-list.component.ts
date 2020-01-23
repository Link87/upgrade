import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Offer } from '../offer';
import { OffersService } from '../offers.service';
import { switchMap, filter, delay } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {
  
  private offers: Offer[] = []
  @Input() offerFilter: (offer: Offer) => boolean = (offer) => true;
  private offerSubscription: Subscription

  constructor(private offerService: OffersService, private router: Router, private authenticationService: AuthService) {  }

  ngOnInit() {
    this.refreshOffers()
  }

  async refreshOffers() {
    this.offers = []
    
    if (this.offerSubscription !== undefined)
      this.offerSubscription.unsubscribe()

    this.offerSubscription = this.offerService.getOffers().pipe(
      switchMap((input) => of(...input)),
      filter(this.offerFilter)
    ).subscribe(input => {
      this.offers.push(input)
    });
  }

  async deleteOffer(id: string) {
    this.offerService.deleteOffer(id).pipe(
      delay(50)
    ).subscribe(result => {
      this.refreshOffers()
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshOffers();
  }

}
