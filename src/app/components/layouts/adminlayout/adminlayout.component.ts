import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AdminnavbarComponent } from '../../navbar/adminnavbar/adminnavbar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [RouterOutlet, AdminnavbarComponent, RouterLink, TranslateModule],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css',
})
export class AdminlayoutComponent {}
