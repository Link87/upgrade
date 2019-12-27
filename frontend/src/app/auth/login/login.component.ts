import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  private submitted = false;
  private wrongCredentials = false;

  private redirect: string;
  private authRequired: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validateCredentials.bind(this)/*, Validators.email*/]],
      password: ['', [Validators.required, this.validateCredentials.bind(this)]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.wrongCredentials = false;
      this.loginForm.controls.email.updateValueAndValidity({ emitEvent: false });
      this.loginForm.controls.password.updateValueAndValidity({ emitEvent: false });
    });

    this.route.queryParams
      .subscribe(params => {
        this.authRequired = params.authRequired || false;
        this.redirect = params.redirect || '/';
        if (this.authService.isAuthenticated()) {
          this.router.navigateByUrl(this.redirect);
        }
      });
  }

  validateCredentials(): { wrongCredentials: boolean } | null {
    return this.wrongCredentials ? { wrongCredentials: true } : null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    }
    this.authService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value)
    .subscribe(
      user => {
        console.log(user);
        this.router.navigateByUrl(this.redirect);
      },
      error => {
        console.error(error);
        this.wrongCredentials = true;
        this.loginForm.controls.email.updateValueAndValidity({ emitEvent: false });
        this.loginForm.controls.password.updateValueAndValidity({ emitEvent: false });
      }
    );
  }

}
