import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly _HttpClient = inject(HttpClient);

  getUserData(userId: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/users/${userId}`
    );
  }

  updateUserData(data: object, token: string): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/users/updateMe',
      data,
      {
        headers: { token },
      }
    );
  }
}
