import { Routes } from '@angular/router';

export const COMPONENTE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./componentes-list/componentes-list.component').then(m => m.ComponentesListComponent) },
  { path: ':id', loadComponent: () => import('./componente-detail/componente-detail.component').then(m => m.ComponenteDetailComponent) }
];
