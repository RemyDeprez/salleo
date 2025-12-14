import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'salles',
    loadComponent: () => import('./components/rooms/rooms.component').then((m) => m.RoomsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('./reservations/reservations.component').then((m) => m.ReservationsComponent),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'salles', pathMatch: 'full' },
  { path: '**', redirectTo: 'salles' },
];
