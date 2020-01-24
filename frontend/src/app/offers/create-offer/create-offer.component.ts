import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Offer } from '../offer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  offerForm: FormGroup;
  submitted = false;

  constructor(private offerService: OffersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.offerForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      loan: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      request: ['request']
    });

    this.offerForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.offerForm.invalid) {
      return false;
    }
    this.offerService.createOffer(
        new Offer(this.offerForm.controls.name.value,
                  this.offerForm.controls.subject.value,
                  this.offerForm.controls.loan.value,
                  this.offerForm.controls.type.value,
                  this.offerForm.controls.description.value,
                  null,
                  null,
                  this.offerForm.controls.request.value === 'request'))
        .subscribe(() => {
          console.log(this.offerForm.controls.request.value);
          this.router.navigateByUrl(this.offerForm.controls.request.value === 'request' ? '/requests' : '/offers');
        });
  }

}
