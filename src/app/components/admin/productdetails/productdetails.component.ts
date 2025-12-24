import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { IproductDetails } from '../../../core/interfaces/iproducts';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css',
})
export class ProductdetailsComponent implements OnInit {
  productDetails: WritableSignal<IproductDetails> = signal(
    {} as IproductDetails
  );

  readonly _ActivatedRoute = inject(ActivatedRoute);
  readonly _AdminService = inject(AdminService);
  readonly _Location = inject(Location);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this._AdminService.getProductDetails(p.get('id')!).subscribe({
          next: (res) => {
            this.productDetails.set(res.data);
          },
        });
      },
    });
  }
}
