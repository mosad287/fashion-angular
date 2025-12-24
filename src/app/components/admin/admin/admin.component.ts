import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { Iproducts } from '../../../core/interfaces/iproducts';
import { AdminService } from '../../../core/services/admin.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  productsNumber: WritableSignal<number> = signal(0);
  lastProductAdd: WritableSignal<Iproducts | null> = signal(null);

  readonly _ShopService = inject(ShopService);
  readonly _AdminService = inject(AdminService);

  ngOnInit(): void {
    this._ShopService.getShopProduct().subscribe({
      next: (res) => {
        this.productsNumber.set(res.numOfCartItems);
        this.lastProductAdd.set(res.data.products[0]);
      },
    });
  }
}
