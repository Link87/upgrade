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

  filter: (Offer) => boolean = (offer) => true;

  ngOnInit() {
    
  }

}
