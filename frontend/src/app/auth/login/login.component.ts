import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  private redirect: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.queryParams
      .subscribe(params => this.redirect = params.redirect || '/');
  }


  async onSubmit() {
    this.authService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value)
    .subscribe(
      user => {
        console.log(user);
        this.router.navigateByUrl(this.redirect);
      },
      error => console.error(error)
    );
  }

}
