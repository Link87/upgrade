import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticator: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      housenumber: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      street: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }


  async onSubmit() {
    // TODO got token, should set profile data with a second request
    this.authenticator.create(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value)
    .subscribe(
      user => console.log(user),
      error => console.error(error)
    );
  }


}
