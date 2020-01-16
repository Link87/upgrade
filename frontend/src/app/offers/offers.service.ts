import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) {
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('http://localhost:3000/api/v1/offers')
  }

  createOffer(offer: Offer) {
    this.http.post<any>('http://localhost:3000/api/v1/offers/new', offer).subscribe(offers => {});
  }
}
