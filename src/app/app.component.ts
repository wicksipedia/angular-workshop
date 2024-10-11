import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CompanyService } from './company/company.service';
import { AsyncPipe } from '@angular/common';
import { environment } from '../environments/environment';

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

  constructor(private readonly companyService: CompanyService) {}

  companyCount$!: Observable<number>;

  ngOnInit(): void {
    this.companyCount$ = this.companyService
      .getCompanies()
      .pipe(map((c) => c.length));
  }
}
