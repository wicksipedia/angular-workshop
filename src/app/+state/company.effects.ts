import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CompanyActions } from './company.actions';
import { CompanyService } from '../company/company.service';

@Injectable()
export class CompanyEffects {
  private actions$ = inject(Actions);
  private companyService = inject(CompanyService);

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCompanies),
      switchMap(() => this.companyService.getCompanies()),
      map((companies) =>
        CompanyActions.loadCompaniesSuccess({ data: companies }),
      ),
      catchError((error) => of(CompanyActions.loadCompaniesFailure({ error }))),
    ),
  );
}
