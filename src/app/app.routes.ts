import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/productspage/productspage.component').then(
        (m) => m.ProductspageComponent
      ),
  },
  {
    path: 'shopping',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/shoppingpage/shoppingpage.component').then(
        (m) => m.ShoppingpageComponent
      ),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/cart/cart.component').then((m) => m.CartComponent),
  },
];
