import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCompany from './company.reducer';

export const selectCompanyState = createFeatureSelector<fromCompany.State>(
  fromCompany.companyFeatureKey,
);

export const selectCompanyCount = createSelector(
  selectCompanyState,
  (state: fromCompany.State) => state.companies.length,
);
