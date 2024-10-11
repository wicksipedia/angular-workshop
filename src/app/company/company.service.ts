import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_BASE = environment.API_BASE;

  companies$ = new BehaviorSubject<Company[]>([]);

  constructor(private readonly httpClient: HttpClient) {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap((x) => console.log('TAP - Service', x)),
        finalize(() => console.log('Finalize: Complete')),
        catchError((e) => this.errorHandler<Company[]>(e)),
      )
      .subscribe((c) => {
        this.companies$.next(c);
      });
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError((e) => this.errorHandler<Company>(e)));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient
      .post<Company>(`${this.API_BASE}/company`, company)
      .pipe(
        catchError((e) => this.errorHandler<Company>(e)),
        tap(() => this.loadCompanies()),
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company)
      .pipe(
        catchError((e) => this.errorHandler<Company>(e)),
        tap(() => this.loadCompanies()),
      );
  }

  deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        catchError(this.errorHandler<Company>),
        tap(() => this.loadCompanies()),
      );
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('implement custom errort handler here', error);
    return new Observable<T>();
  }
}
