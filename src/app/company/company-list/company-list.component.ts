import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { CompanyTableComponent } from "../company-table/company-table.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, CompanyTableComponent, RouterLink],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
  companies$!: Observable<Company[]>;

  constructor(private readonly companyService: CompanyService) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }

  deleteCompany(companyId: number) {
    this.companyService
      .deleteCompany(companyId)
      .subscribe(() => this.getCompanies());
  }
}
