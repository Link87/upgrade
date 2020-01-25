import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  id: string;
  profileForm: FormGroup;
  profile: Profile;
  private submitted = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {

    this.id = this.route.snapshot.params.id;

    if (!this.authService.isAuthenticated() || this.authService.user.userId !== this.id) {
      this.router.navigate(['..'], { relativeTo: this.route });
    }

  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      housenumber: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.profileService.getProfile(this.id).subscribe(profile => {
      this.profile = profile;
      this.profileForm.controls.name.setValue(profile.name);
      this.profileForm.controls.street.setValue(profile.street);
      this.profileForm.controls.housenumber.setValue(profile.housenumber);
      this.profileForm.controls.zipcode.setValue(profile.zipCode);
      this.profileForm.controls.city.setValue(profile.city);
      this.profileForm.controls.description.setValue(profile.description);
    });
  }

  async onSubmit() {
    this.profileService.updateProfile(this.id,
      new Profile(this.profileForm.controls.name.value,
                  this.profileForm.controls.street.value,
                  this.profileForm.controls.housenumber.value,
                  this.profileForm.controls.zipcode.value,
                  this.profileForm.controls.city.value,
                  this.profileForm.controls.description.value)).subscribe(() => {
                    this.router.navigate(['..'], { relativeTo: this.route });
                  });
  }

}
