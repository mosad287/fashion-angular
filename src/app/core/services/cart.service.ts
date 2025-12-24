import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly _HttpClient = inject(HttpClient);
  productsLength: WritableSignal<number> = signal(0);

  getCartProducts(token: string): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token },
    });
  }

  addProductToCart(id: string, token: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: { token },
      }
    );
  }

  udateCart(cartId: string, count: number, token: string): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${cartId}`,
      { count: count },
      {
        headers: { token },
      }
    );
  }

  cleaCart(token: string): Observable<any> {
    return this._HttpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: { token },
      }
    );
  }

  removeItem(id: string, token: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: { token },
      }
    );
  }
}
