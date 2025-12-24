import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  readonly _HttpClient = inject(HttpClient);

  getShopProduct(): Observable<any> {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWY1M2EzNTJlOGUwY2EzZDFiNzU4NSIsIm5hbWUiOiJtb3NhZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYzODM3MDkwLCJleHAiOjE3NzE2MTMwOTB9.x-oUL7_3O6hjrd_f7PEk_carT3GA988rkzuAQPhbLv8';

    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token },
    });
  }
}
