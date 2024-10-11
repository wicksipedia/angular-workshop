import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'company/list', pathMatch: 'full' },
  {
    path: 'company/list',
    loadComponent: () =>
      import('./company/company-list/company-list.component').then(
        (m) => m.CompanyListComponent
      ),
  },
  {
    path: 'company/add',
    loadComponent: () =>
      import('./company/company-edit/company-edit.component').then(
        (m) => m.CompanyEditComponent
      ),
  },
  {
    path: 'company/edit/:id',
    loadComponent: () =>
      import('./company/company-edit/company-edit.component').then(
        (m) => m.CompanyEditComponent
      ),
  },
];
