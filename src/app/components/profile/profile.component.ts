import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  readonly _FormBuilder = inject(FormBuilder);
  readonly _UserService = inject(UserService);

  userName: WritableSignal<string> = signal('');

  userForm: FormGroup = this._FormBuilder.group({
    name: [''],
    email: [''],
    role: [''],
    phone: [''],
  });

  ngOnInit(): void {
    this._UserService.getUserData(this._AuthService.userData().id).subscribe({
      next: (res) => {
        this.userName.set(res.data.name);

        this.userForm.patchValue({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          phone: res.data.phone,
        });
      },
    });
  }
}
