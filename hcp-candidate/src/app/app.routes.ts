
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AuthGuard, GuestGuard } from './guards';
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Auth routes with AuthLayout - only for non-authenticated users
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [GuestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/registration/registration.component').then(m => m.RegistrationComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ],
  },
  
  // Main application routes with MainLayout - protected by AuthGuard
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home),
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home), // Replace with actual dashboard component
      },
    ],
  },
  
  // Redirect /login and /register to auth routes
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },
  
  // Wildcard route
  { path: '**', redirectTo: '' },
];
