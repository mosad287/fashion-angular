import { Component } from '@angular/core';
import { AuthnavbarComponent } from '../../navbar/authnavbar/authnavbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-authlayout',
  standalone: true,
  imports: [AuthnavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.css',
})
export class AuthlayoutComponent {}
