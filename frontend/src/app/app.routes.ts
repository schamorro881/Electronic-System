import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },
  { 
    path: 'componentes', 
    loadChildren: () => import('./features/componentes/componentes.routes').then(m => m.COMPONENTE_ROUTES) 
  },
  { 
    path: 'resistencias', 
    loadChildren: () => import('./features/resistencias/resistencias.routes').then(m => m.RESISTENCIA_ROUTES) 
  },
  { 
    path: 'ohm-calculator', 
    loadChildren: () => import('./features/ohm-calculator/ohm-calculator.routes').then(m => m.OHM_ROUTES) 
  },
  { path: '**', redirectTo: 'home' }
];
