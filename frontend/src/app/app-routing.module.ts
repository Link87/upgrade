import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { OffersComponent } from './offers/offers.component';

const appRoutes: Routes = [
  { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'offers', component: OffersComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AuthRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
