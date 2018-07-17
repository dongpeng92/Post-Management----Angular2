import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private _router : Router, private _fb : FormBuilder,
              private _authService : AuthService) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  login() {
    console.log(this.loginForm.value);
    this._authService.login(this.loginForm.value);
  }

  register() {
    this._router.navigate(['/register']);
  }
}
