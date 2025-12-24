import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homebackground',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './homebackground.component.html',
  styleUrl: './homebackground.component.css',
})
export class HomebackgroundComponent implements OnInit {
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
