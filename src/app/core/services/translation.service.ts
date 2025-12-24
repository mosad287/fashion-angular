import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  checkLang: WritableSignal<boolean> = signal(false);

  readonly _TranslateService = inject(TranslateService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);
  readonly _Renderer = inject(RendererFactory2).createRenderer(null, null);

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const savedLang = localStorage.getItem('lang');

      if (savedLang) {
        this._TranslateService.use(savedLang);
      }

      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      this._Renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer.setAttribute(document.documentElement, 'lang', 'en');
      this.checkLang.set(false);
    } else if (localStorage.getItem('lang') === 'ar') {
      this._Renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer.setAttribute(document.documentElement, 'lang', 'ar');
      this.checkLang.set(true);
    }
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('lang', lang);
    }

    this._TranslateService.use(lang);
    this.changeDirection();
  }
}
