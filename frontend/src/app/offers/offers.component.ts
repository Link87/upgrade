import { Component, OnInit } from '@angular/core';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(private offerService:OffersService) { }

  ngOnInit() {
  }

}
