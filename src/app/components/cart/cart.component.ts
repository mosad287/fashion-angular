import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icartproduct } from '../../core/interfaces/icartproduct';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProducts: WritableSignal<Icartproduct[]> = signal([]);
  totalPrice: WritableSignal<number> = signal(0);
  userToken: WritableSignal<string> = signal('');

  readonly _CartService = inject(CartService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const token = localStorage.getItem('token')!;
      this.userToken.set(token);

      this._CartService.getCartProducts(token).subscribe({
        next: (res) => {
          this.cartProducts.set(res.data.products);
          this._CartService.productsLength.set(res.numOfCartItems);
          this.totalPrice.set(res.data.totalCartPrice);
        },
      });
    }
  }

  update(cartId: string, count: number): void {
    this._CartService.udateCart(cartId, count, this.userToken()).subscribe({
      next: (res) => {
        this.cartProducts.set(res.data.products);
        this._CartService.productsLength.set(res.numOfCartItems);
        this.totalPrice.set(res.data.totalCartPrice);
      },
    });
  }

  clear(): void {
    this._CartService.cleaCart(this.userToken()).subscribe({
      next: () => {
        this.cartProducts.set([]);
        this._CartService.productsLength.set(0);
      },
    });
  }

  deleteItem(id: string): void {
    this._CartService.removeItem(id, this.userToken()).subscribe({
      next: (res) => {
        this.cartProducts.set(res.data.products);
        this._CartService.productsLength.set(res.numOfCartItems);
        this.totalPrice.set(res.data.totalCartPrice);
      },
    });
  }
}
