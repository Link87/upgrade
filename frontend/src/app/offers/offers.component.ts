import { Component, OnInit, Input } from '@angular/core';
import { OffersService } from './offers.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { of, OperatorFunction, forkJoin, interval } from 'rxjs';
import { Offer } from '../models/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(private offerService: OffersService) { }

  query: string;
  filter: (offer: Offer) => boolean = (offer) => !offer.isRequest;

  ngOnInit() {
  }

  onSubmit() {
    this.filter = (offer: Offer) => {
      if (offer.isRequest) {
        return false;
      }

      if (this.query.split(' ').length === 0) {
        return true;
      }

      for (const chunk of this.query.split(' ').map(chunk => chunk.toLowerCase())) {
        if (offer.description.toLowerCase().includes(chunk)
          || offer.name.toLowerCase().includes(chunk)
          || offer.subject.toLowerCase().includes(chunk)
          || offer.type.toLowerCase().includes(chunk)) {

          return true;
        }
      }
      return false;
    };
  }

  private clearFilters() {
    this.query = '';
    this.onSubmit();
  }

}
