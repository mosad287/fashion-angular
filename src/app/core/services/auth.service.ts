import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: WritableSignal<any> = signal(null);

  readonly _HttpClient = inject(HttpClient);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);

  regester(data: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }

  login(data: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  saveUserData(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('token') !== null) {
        this.userData.set(jwtDecode(localStorage.getItem('token')!));
      }
    }
  }
}
