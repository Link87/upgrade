import { Injectable } from '@angular/core';
import { Offer } from './offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor() { }

  getOffers(){
    return [new Offer("MaLo ist viel zu schwer!","MaLo",420,"Student","MaLo Der Prof ist mega doof und das ist auf gar keinen Fall meine Schuld. Weil ich habe mir beim Abschreiben der Hausaufgaben immer sehr viel Mühe gegeben und den ersten Klausurversuch trotzdem nicht bestanden. asdhgiaushdioa. Helft mir bitte ich will meinen Bachelor.")]
  }
}
