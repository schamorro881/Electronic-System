import { Routes } from '@angular/router';

export const RESISTENCIA_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./resistencias-buscador/resistencias-buscador.component').then(m => m.ResistenciasBuscadorComponent) }
];
