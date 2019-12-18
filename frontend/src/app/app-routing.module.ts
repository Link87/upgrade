import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { navbar: false }},
  { path: 'register', component: RegisterComponent, data: { navbar: false }},
  { path: 'chat', component: ChatComponent, data: { navbar: true}},
  { path: '', component: HomeComponent, data: { navbar: true }},
  { path: '**', component: PageNotFoundComponent, data: { navbar: true }},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
