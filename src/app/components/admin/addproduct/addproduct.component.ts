import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { IallProduct, Iproducts } from '../../../core/interfaces/iproducts';
import { ShopService } from '../../../core/services/shop.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent implements OnInit {
  allProducts: WritableSignal<IallProduct[]> = signal([]);
  adminProducts: WritableSignal<Iproducts[]> = signal([]);

  productNotAdded: Signal<IallProduct[]> = computed(() =>
    this.allProducts().filter((product1) => {
      return !this.adminProducts().some((products2) => {
        return product1.id == products2.product.id;
      });
    })
  );

  readonly _AdminService = inject(AdminService);
  readonly _ShopService = inject(ShopService);
  readonly _CartService = inject(CartService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    this._AdminService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
      },
    });

    this._ShopService.getShopProduct().subscribe({
      next: (res) => {
        this.adminProducts.set(res.data.products);
      },
    });
  }

  addProduct(id: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const token = localStorage.getItem('token')!;

      this._CartService.addProductToCart(id, token).subscribe({
        next: () => {
          this._ShopService.getShopProduct().subscribe({
            next: (res) => {
              this.adminProducts.set(res.data.products);
            },
          });
        },
      });
    }
  }
}
