import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Company } from '../company/company';

export const CompanyActions = createActionGroup({
  source: 'Company',
  events: {
    'Load Companies': emptyProps(),
    'Load Companies Success': props<{ data: Company[] }>(),
    'Load Companies Failure': props<{ error: unknown }>(),
  }
});
