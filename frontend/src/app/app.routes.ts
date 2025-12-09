import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    data: {
      RenderMode: 'client',
    },
  },
  {
    path: 'signup',
    component: Signup,
    data: {
      RenderMode: 'client',
    },
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: {
      RenderMode: 'client',
    },
  },
  {
    path: 'arcades',
    data: {
      RenderMode: 'client',
    },
    loadComponent: () => import('./pages/arcades/arcades').then((m) => m.Arcades),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
