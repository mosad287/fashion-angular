import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LangdropdownComponent } from '../../../shared/langdropdown/langdropdown.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authnavbar',
  standalone: true,
  imports: [TranslateModule, LangdropdownComponent, RouterLink],
  templateUrl: './authnavbar.component.html',
  styleUrl: './authnavbar.component.css',
})
export class AuthnavbarComponent {}
