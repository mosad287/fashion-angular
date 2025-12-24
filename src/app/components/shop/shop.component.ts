import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CartService } from '../../core/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  products: WritableSignal<Iproducts[]> = signal([]);

  readonly _ShopService = inject(ShopService);
  readonly _CartService = inject(CartService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);
  readonly _ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this._ShopService.getShopProduct().subscribe({
      next: (res) => {
        this.products.set(res.data.products);
      },
    });
  }

  addProduct(id: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const token = localStorage.getItem('token')!;

      this._CartService.addProductToCart(id, token).subscribe({
        next: (res) => {
          this._ToastrService.success(res.message);
          this._CartService.productsLength.set(res.numOfCartItems);
        },
      });
    }
  }
}
