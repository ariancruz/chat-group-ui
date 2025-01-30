import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./module/auth/auth.component').then(c => c.AuthComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./module/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./module/layout/layout.component').then(c => c.LayoutComponent)
  },

];
