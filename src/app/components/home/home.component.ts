import { Component } from '@angular/core';
import { HomebackgroundComponent } from './homebackground/homebackground.component';
import { HomecategoriesComponent } from './homecategories/homecategories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomebackgroundComponent, HomecategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
