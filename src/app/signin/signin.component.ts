import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private authService: AuthService) {}

  showError: boolean = false;

  Form = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (!this.Form.valid) {
      this.showError = true;
      return;
    }
    let email = String(this.Form.get('login')!.value);
    let password = String(this.Form.get('password')!.value);
    this.authService.SignInUser(email, password);
    this.showError = false;
    this.Form.reset();
  }
}
