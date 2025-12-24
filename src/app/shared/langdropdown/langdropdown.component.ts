import { Component, inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-langdropdown',
  standalone: true,
  imports: [TranslateModule, NgClass],
  templateUrl: './langdropdown.component.html',
  styleUrl: './langdropdown.component.css',
})
export class LangdropdownComponent {
  readonly _TranslationService = inject(TranslationService);
  readonly _PLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('lang') === 'ar') {
        this._TranslationService.checkLang.set(true);
      }
    }
  }
}
