import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}
  showError: boolean = false;

  Form = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl(''),
  });

  register() {
    if (!this.Form.valid) {
      this.showError = true;
      return;
    }
    let email = String(this.Form.get('login')!.value);
    let password = String(this.Form.get('password')!.value);
    let role = String(this.Form.get('role')!.value);
    if (role == '') role = 'client';
    this.authService.SignUpUser(email, password, role);
    this.showError = false;
    this.Form.reset();
  }
}
