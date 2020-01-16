import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateOfferModule } from './create-offer/create-offer.module';
import { OffersListComponent } from './offers-list/offers-list.component';


@NgModule({
  declarations: [OffersComponent, OffersListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateOfferModule
  ],
  exports: [
    OffersComponent,
    OffersListComponent
  ]
})
export class OffersModule { }
