import { Component, OnInit, OnDestroy } from '@angular/core';
import { OffersComponent } from '../offers/offers.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, Subscription } from 'rxjs';
import { Offer } from '../offers/offer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from './profile';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  idObservable: Subject<string> = new Subject();
  id: string;
  profile: Profile = new Profile('', '');
  routerSubscription: Subscription;
  filter: (offer: Offer) => boolean = (offer) => true;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {

    const id = this.route.snapshot.params.id;
    this.idObservable.next(id);

    this.routerSubscription = this.router.events.subscribe(event => {
      this.idObservable.next(this.route.snapshot.params.id);
    });

    this.idObservable.subscribe(newId => {
      this.id = newId;
      this.filter = (offer) => {
        const value = newId === offer.owner;
        return value;
      };
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
