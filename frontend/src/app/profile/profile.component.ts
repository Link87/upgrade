import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {

  idObservable: Subject<string> = new Subject()
  id: string
  filter: (offer: Offer) => boolean = (offer) => true
  profileForm: FormGroup;
  profile: Profile = new Profile("", "");
  routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private proifleService: ProfileService, private authService: AuthService, private router: Router) { 
    const id = this.route.snapshot.params['id']
    this.idObservable.next(id)

    this.routerSubscription = this.router.events.subscribe(event => {
      this.idObservable.next(this.route.snapshot.params['id'])
    })

    this.idObservable.subscribe(newId => {
      this.id = newId
      this.filter = (offer) => {
        const value = newId === offer.owner
        return value
      }

      this.proifleService.getProfile(newId).subscribe(profile => {
        this.profile = profile
        this.profileForm.controls.name.setValue(profile.name)
        this.profileForm.controls.description.setValue(profile.description)
      })
    })

    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  async onSubmit() {
    this.proifleService.updateProfile(this.id, new Profile(
      this.profileForm.value.name,
      this.profileForm.value.description
    ))
  }

}
