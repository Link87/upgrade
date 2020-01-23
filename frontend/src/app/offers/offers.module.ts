import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateOfferModule } from './create-offer/create-offer.module';
import { OffersListComponent } from './offers-list/offers-list.component';
import { RequestsComponent } from './requests.component';


@NgModule({
  declarations: [OffersComponent, OffersListComponent, RequestsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateOfferModule
  ],
  exports: [
    OffersComponent,
    RequestsComponent,
    OffersListComponent
  ]
})
export class OffersModule { }
