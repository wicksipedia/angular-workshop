import { createReducer, on } from '@ngrx/store';
import { CompanyActions } from './company.actions';
import { Company } from '../company/company';

export const companyFeatureKey = 'company';

export interface State {
  companies: Company[];
}

export const initialState: State = {
  companies: [],
};

export const reducer = createReducer(
  initialState,
  on(CompanyActions.loadCompaniesSuccess, (_state, { data }) => {
    return { companies: data };
  }),
);
