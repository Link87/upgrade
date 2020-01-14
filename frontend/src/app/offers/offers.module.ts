import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateOfferModule } from './create-offer/create-offer.module';


@NgModule({
  declarations: [OffersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateOfferModule
  ]
})
export class OffersModule { }
