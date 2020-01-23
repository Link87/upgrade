import { Component, OnInit, Input } from '@angular/core';
import { OffersService } from './offers.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { of, OperatorFunction, forkJoin, interval } from 'rxjs';
import { Offer } from './offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(private offerService:OffersService) { }

  filter: (Offer) => boolean = (offer) => !offer.isRequest;
  query: string;

  ngOnInit() {
    
  }

  onSubmit () {
    this.filter = (offer: Offer) => {
      if (offer.isRequest) {
        return false
      }

      if (this.query.split(" ").length === 0) {
        return true
      }

      for (let chunk of this.query.split(" ").map(chunk => chunk.toLowerCase())) {
        if (offer.description.toLowerCase().includes(chunk) 
          || offer.name.toLowerCase().includes(chunk) 
          || offer.subject.toLowerCase().includes(chunk) 
          || offer.type.toLowerCase().includes(chunk)) {

          return true;
        }
      }      
      return false
    }
  }

}
