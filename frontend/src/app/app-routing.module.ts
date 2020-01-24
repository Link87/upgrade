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
import { CreateOfferComponent } from './offers/create-offer/create-offer.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './offers/requests.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';

const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'offers', component: OffersComponent },
  { path: 'offers/create', component: CreateOfferComponent, canActivate: [AuthGuard] },
  { path: 'requests', component: RequestsComponent},
  { path: 'users/:id/profile', component: ProfileComponent},
  { path: 'users/:id/profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AuthRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
