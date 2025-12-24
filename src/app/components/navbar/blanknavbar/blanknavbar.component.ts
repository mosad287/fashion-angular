import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LangdropdownComponent } from '../../../shared/langdropdown/langdropdown.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-blanknavbar',
  standalone: true,
  imports: [
    TranslateModule,
    LangdropdownComponent,
    RouterLink,
    RouterLinkActive,
    NgClass,
  ],
  templateUrl: './blanknavbar.component.html',
  styleUrl: './blanknavbar.component.css',
})
export class BlanknavbarComponent implements OnInit {
  isAdmin: WritableSignal<boolean> = signal(false);

  readonly _Router = inject(Router);
  readonly _CartService = inject(CartService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);
  readonly _TranslationService = inject(TranslationService);

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('lang') === 'ar') {
        this._TranslationService.checkLang.set(true);
      }

      if (localStorage.getItem('role') === 'admin') {
        this.isAdmin.set(true);
      }

      const token = localStorage.getItem('token')!;

      this._CartService.getCartProducts(token).subscribe({
        next: (res) => {
          this._CartService.productsLength.set(res.numOfCartItems);
        },
      });
    }
  }

  signOut(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('role') !== null) {
        localStorage.removeItem('role');
      }
    }

    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
