import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-adminnavbar',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './adminnavbar.component.html',
  styleUrl: './adminnavbar.component.css',
})
export class AdminnavbarComponent {}
