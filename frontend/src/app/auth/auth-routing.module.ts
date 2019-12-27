import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';


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
