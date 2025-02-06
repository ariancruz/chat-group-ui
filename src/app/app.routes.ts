import {Routes} from '@angular/router';
import {canActivateAuthGuard, canActivateNotAuthGuard} from './guards';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [canActivateNotAuthGuard],
    loadComponent: () => import('./module/auth/auth.component').then(c => c.AuthComponent)
  },
  {
    path: 'register',
    canActivate: [canActivateNotAuthGuard],
    loadComponent: () => import('./module/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: '',
    canActivate: [canActivateAuthGuard],
    loadChildren: () => import('./module/layout/layout.module').then(c => c.LayoutModule)
  }
];
