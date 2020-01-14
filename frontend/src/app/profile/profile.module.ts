import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
