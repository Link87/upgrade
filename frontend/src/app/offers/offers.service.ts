import { Injectable } from '@angular/core';
import { Offer } from '../models/offer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) {
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('http://localhost:3000/api/v1/offers');
  }

  createOffer(offer: Offer): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/offers/new', offer);
  }

  deleteOffer(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/offers/${id}`);
  }

}
