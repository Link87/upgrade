import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  offerForm:FormGroup;

  constructor(private offerService: OffersService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.offerForm = this.formBuilder.group({
    name: ['', Validators.required],
    subject: ['', Validators.required],
    loan: ['', Validators.required],
    type: ['', Validators.required],
    description: ['', Validators.required],
  });
  }

  async onSubmit() {
    this.offerService.createOffer();
  }

}
