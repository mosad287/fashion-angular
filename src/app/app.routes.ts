import { Routes } from '@angular/router';
import { BlanklayoutComponent } from './components/layouts/blanklayout/blanklayout.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { loginGuard } from './core/guards/login.guard';
import { notloginGuard } from './core/guards/notlogin.guard';
import { CartComponent } from './components/cart/cart.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // part to regester
  {
    path: '',
    loadComponent: () =>
      import('./components/layouts/authlayout/authlayout.component').then(
        (c) => c.AuthlayoutComponent
      ),
    canActivate: [notloginGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'regester',
        loadComponent: () =>
          import('./components/regester/regester.component').then(
            (c) => c.RegesterComponent
          ),
      },
    ],
  },

  // part to admin
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/layouts/adminlayout/adminlayout.component').then(
        (c) => c.AdminlayoutComponent
      ),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/admin/admin/admin.component').then(
            (c) => c.AdminComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            './components/admin/adminproducts/adminproducts.component'
          ).then((c) => c.AdminproductsComponent),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            './components/admin/productdetails/productdetails.component'
          ).then((c) => c.ProductdetailsComponent),
      },
      {
        path: 'product/addproduct',
        loadComponent: () =>
          import('./components/admin/addproduct/addproduct.component').then(
            (c) => c.AddproductComponent
          ),
      },
    ],
  },

  // part to mainapp
  {
    path: '',
    component: BlanklayoutComponent,
    canActivate: [loginGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'profile/edit',
        loadComponent: () =>
          import('./components/editprofile/editprofile.component').then(
            (c) => c.EditprofileComponent
          ),
      },
    ],
  },

  // part to notfount
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
  },
];
