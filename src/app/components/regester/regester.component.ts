import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regester',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './regester.component.html',
  styleUrl: './regester.component.css',
})
export class RegesterComponent {
  loading: boolean = false;

  readonly _FormBuilder = inject(FormBuilder);
  readonly _AuthService = inject(AuthService);
  readonly _Router = inject(Router);

  regesterForm: FormGroup = this._FormBuilder.group(
    {
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.comfirmPassword }
  );

  hundelRegester(): void {
    if (this.regesterForm.valid) {
      this.loading = true;
      this._AuthService.regester(this.regesterForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);

          if (
            this.regesterForm.get('email')?.value ===
            'mosadalbarbary832@gmail.com'
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

  comfirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
}
