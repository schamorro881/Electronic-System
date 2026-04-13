import { Routes } from '@angular/router';

export const OHM_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./calculator/calculator.component').then(m => m.CalculatorComponent) }
];
