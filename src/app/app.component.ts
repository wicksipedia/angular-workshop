import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { CompanyActions } from './+state/company.actions';
import { selectCompanyCount } from './+state/company.selectors';

@Component({
  selector: 'fbc-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'firebootcamp-crm';
  environment = environment.environment;

  companyCount$: Observable<number>;

  constructor(
    private readonly store: Store,
  ) {
    this.companyCount$ = this.store.select(selectCompanyCount);
  }

  ngOnInit(): void {
    this.store.dispatch(CompanyActions.loadCompanies());
  }
}
