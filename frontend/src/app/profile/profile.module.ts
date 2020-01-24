import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OffersModule } from '../offers/offers.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProfileComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OffersModule,
    RouterModule
  ]
})
export class ProfileModule { }
