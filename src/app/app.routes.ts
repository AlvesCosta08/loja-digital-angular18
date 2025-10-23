// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./features/catalog/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart-page/cart-page.component').then(m => m.CartPageComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/cart/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/product',
    loadComponent: () => import('./features/admin/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/home' }
];
