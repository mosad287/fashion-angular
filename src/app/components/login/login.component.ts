import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading: boolean = false;

  readonly _FormBuilder = inject(FormBuilder);
  readonly _AuthService = inject(AuthService);
  readonly _Router = inject(Router);

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  hundelLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);

          if (
            this.loginForm.get('email')?.value === 'mosadalbarbary832@gmail.com'
          ) {
            localStorage.setItem('role', 'admin');
          }

          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
