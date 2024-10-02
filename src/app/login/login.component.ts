import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /* login user form */
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.min(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /* submit login form event */
  onSubmit() {
    if (this.loginForm?.valid) {
      const { mobile, password } = this.loginForm?.value;
      if (this.authService.login(mobile, password)) {
        this.router.navigate(['/landing']);
      } else {
        alert('Invalid credentials');
      }
    }
  }

}
