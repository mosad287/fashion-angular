import {
  Component,
  inject,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { isPlatformBrowser, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent {
  readonly _AuthService = inject(AuthService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);
  readonly _FormBuilder = inject(FormBuilder);
  readonly _UserService = inject(UserService);
  readonly _Location = inject(Location);

  userName: WritableSignal<string> = signal('');

  editUserForm: FormGroup = this._FormBuilder.group({
    name: [''],
    email: [''],
    phone: [''],
  });

  ngOnInit(): void {
    this._UserService.getUserData(this._AuthService.userData().id).subscribe({
      next: (res) => {
        this.userName.set(res.data.name);

        this.editUserForm.patchValue({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      },
    });
  }

  edit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('token') !== null) {
        let token = localStorage.getItem('token')!;

        this._UserService
          .updateUserData(this.editUserForm.value, token)
          .subscribe({
            next: (res) => {
              this._Location.back();
            },
          });
      }
    }
  }
}
