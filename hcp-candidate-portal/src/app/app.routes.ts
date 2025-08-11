import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'jobs',
        loadComponent: () => import('./pages/jobs/jobs.component').then(m => m.JobsComponent)
      },
      {
        path: 'hire',
        loadComponent: () => import('./pages/hire/hire.component').then(m => m.HireComponent)
      },
      {
        path: 'clinics',
        loadComponent: () => import('./pages/clinics/clinics.component').then(m => m.ClinicsComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'personal-info',
        loadComponent: () => import('./pages/personal-info/personal-info.component').then(m => m.PersonalInfoComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
