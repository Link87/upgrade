import { Injectable } from '@angular/core';
import { Offer } from './offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor() { }

  getOffers(){
    return [new Offer("MaL0ffsadwqa",1,"MaLo beschte")]
  }
}
