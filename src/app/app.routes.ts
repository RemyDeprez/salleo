import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'salles',
    loadComponent: () => import('./rooms/rooms.component').then((m) => m.RoomsComponent),
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
