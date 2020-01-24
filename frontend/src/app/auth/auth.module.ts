import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterSuccComponent } from './register-succ/register-succ.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterSuccComponent,
    AuthComponent,
    LogoutComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
