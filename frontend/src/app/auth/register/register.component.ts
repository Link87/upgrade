import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/profile/profile.service';
import { Profile } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  private submitted = false;
  private wrongCredentials = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.validateCredentials.bind(this)]],
      password: ['', Validators.required],
      housenumber: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      street: ['', Validators.required],
      name: ['', Validators.required],
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.wrongCredentials = false;
      this.registerForm.controls.email.updateValueAndValidity({ emitEvent: false });
    });
  }


  async onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return false;
    }
    this.authService.create(this.registerForm.controls.email.value, this.registerForm.controls.password.value)
    .subscribe(
        user => {
          console.log(user);
          this.profileService.updateProfile(user.userId,
            new Profile(this.registerForm.controls.name.value,
                        this.registerForm.controls.street.value,
                        this.registerForm.controls.housenumber.value,
                        this.registerForm.controls.zipcode.value,
                        this.registerForm.controls.city.value)).subscribe(() => {
                          this.router.navigateByUrl('/register/success');
                        });
        },
        error => {
          console.error(error);
          this.wrongCredentials = true;
          this.registerForm.controls.email.updateValueAndValidity({ emitEvent: false });
        }
      );
  }

  validateCredentials(): { alreadyExists: boolean } | null {
    return this.wrongCredentials ? { alreadyExists: true } : null;
  }
}
