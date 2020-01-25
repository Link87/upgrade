import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Offer } from '../models/offer.model';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { Profile } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  idObservable: Subject<string> = new Subject();
  id: string;
  profile: Profile = Profile.default();
  routerSubscription: Subscription;
  filter: (offer: Offer) => boolean = (offer) => true;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {

    this.idObservable.next(this.route.snapshot.params.id);

    this.routerSubscription = this.router.events.subscribe(event => {
      this.idObservable.next(this.route.snapshot.params.id);
    });

    this.idObservable.subscribe(newId => {
      this.id = newId;
      this.profileService.getProfile(newId).subscribe(profile => {
        this.profile = profile;
      });
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
