import { Component } from '@angular/core';
import { BlanknavbarComponent } from '../../navbar/blanknavbar/blanknavbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-blanklayout',
  standalone: true,
  imports: [BlanknavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './blanklayout.component.html',
  styleUrl: './blanklayout.component.css',
})
export class BlanklayoutComponent {}
