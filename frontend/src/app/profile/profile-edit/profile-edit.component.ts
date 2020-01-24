import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  id: string;
  profileForm: FormGroup;
  profile: Profile;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {

    this.id = this.route.snapshot.params.id;

    if (!this.authService.isAuthenticated() || this.authService.user.userId !== this.id) {
      this.router.navigate(['..'], { relativeTo: this.route });
    }

    this.profileService.getProfile(this.id).subscribe(profile => {
      this.profile = profile;
      this.profileForm.controls.name.setValue(profile.name);
      this.profileForm.controls.description.setValue(profile.description);
    });

    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    this.profileService.updateProfile(this.id, new Profile(
      this.profileForm.value.name,
      this.profileForm.value.description
    )).subscribe(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

}
