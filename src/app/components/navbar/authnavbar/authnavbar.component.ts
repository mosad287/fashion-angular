import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LangdropdownComponent } from '../../../shared/langdropdown/langdropdown.component';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-authnavbar',
  standalone: true,
  imports: [TranslateModule, LangdropdownComponent, RouterLink],
  templateUrl: './authnavbar.component.html',
  styleUrl: './authnavbar.component.css',
})
export class AuthnavbarComponent implements OnInit {
  readonly _PLATFORM_ID = inject(PLATFORM_ID);
  readonly _TranslationService = inject(TranslationService);

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('lang') === 'ar') {
        this._TranslationService.checkLang.set(true);
      }
    }
  }
}
