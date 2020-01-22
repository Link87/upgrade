import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  
  private submitted = false;
  private wrongCredentials = false;

  constructor(private router: Router,  private route: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      housenumber: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      street: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.wrongCredentials = false;
      this.registerForm.controls.email.updateValueAndValidity({ emitEvent: false });
      this.registerForm.controls.password.updateValueAndValidity({ emitEvent: false });
      this.registerForm.controls.housenumber.updateValueAndValidity({ emitEvent: false });
      this.registerForm.controls.city.updateValueAndValidity({ emitEvent: false });
      this.registerForm.controls.zipcode.updateValueAndValidity({ emitEvent: false });
      this.registerForm.controls.street.updateValueAndValidity({ emitEvent: false });
      this.registerForm.controls.firstname.updateValueAndValidity({ emitEvent: false });
      this.registerForm.controls.lastname.updateValueAndValidity({ emitEvent: false });
    });
  }


  async onSubmit() {
    console.log("TEST.");
    // TODO got token, should set profile data with a second request
    if (this.registerForm.invalid) {
      return false;
    }
    this.authService.create(
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value)
    .subscribe(
        user => {
          console.log(user);
          this.router.navigateByUrl('/register-succ');
        },
        error => {
          console.error(error);
          this.wrongCredentials = true;
          this.registerForm.controls.email.updateValueAndValidity({ emitEvent: false });
          this.registerForm.controls.password.updateValueAndValidity({ emitEvent: false });
        }
      );
  }

  validateCredentials(): { wrongCredentials: boolean } | null {
    return this.wrongCredentials ? { wrongCredentials: true } : null;
  }
}
