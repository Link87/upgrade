import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  offers: Offer[] = [];

  constructor(private http: HttpClient) {
    this.getOffers();
  }

  getOffers() {
    this.http.get<Offer[]>('http://localhost:3000/api/v1/offers').subscribe(offers => {
      this.offers.push(...offers);
    });
  }

  createOffer() {
    this.http.post<any>('http://localhost:3000/api/v1/offers/new',
      new Offer('Kevin', 'MaLo', 123, 'Student', 'Test', '', '')).subscribe(offers => {});
  }
}
