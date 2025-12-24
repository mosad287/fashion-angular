import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { Iproducts } from '../../../core/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-adminproducts',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './adminproducts.component.html',
  styleUrl: './adminproducts.component.css',
})
export class AdminproductsComponent implements OnInit {
  products: WritableSignal<Iproducts[]> = signal([]);

  readonly _ShopService = inject(ShopService);
  readonly _CartService = inject(CartService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    this._ShopService.getShopProduct().subscribe({
      next: (res) => {
        this.products.set(res.data.products);
      },
    });
  }

  remove(id: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const token = localStorage.getItem('token')!;

      this._CartService.removeItem(id, token).subscribe({
        next: (res) => {
          this.products.set(res.data.products);
        },
      });
    }
  }
}
