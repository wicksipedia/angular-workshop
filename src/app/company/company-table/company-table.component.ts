import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../company';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fbc-company-table',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTableComponent {

  @Input({ required: true })
  companies!: Company[];

  @Output()
  deleteCompanyClicked = new EventEmitter<Company>();

  deleteCompany(company: Company) {
    this.deleteCompanyClicked.emit(company);
  }
}
