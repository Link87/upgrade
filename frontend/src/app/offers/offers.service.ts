import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  offers: Offer[] = [];

  constructor(private http: HttpClient) {
    this.getOffers();
  }

  getOffers() {
    this.http.get<Offer[]>("http://localhost:3000/api/v1/offers").subscribe(offers => {
      this.offers.push(...offers);
    });
  }
}