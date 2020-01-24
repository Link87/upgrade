import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterSuccComponent } from './register-succ/register-succ.component';


const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    data: { navbar: false },
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'register',
    component: AuthComponent,
    data: { navbar: false },
    children: [
      { path: '', component: RegisterComponent }
    ]
  },
  {
    path: 'register-success',
    component: AuthComponent,
    data: { navbar: false },
    children: [
      { path: '', component: RegisterSuccComponent }
    ]
  },
  {
    path: 'logout',
    component: AuthComponent,
    data: { navbar: false },
    children: [
      { path: '', component: LogoutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
