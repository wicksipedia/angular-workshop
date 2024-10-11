import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent implements OnInit {
  companyId: any;
  isNewCompany!: boolean;
  companyForm!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;
    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      checkPhone: [''],
      phone: [''],
      email: [''],
    });

    this.companyForm.get('checkPhone')!.valueChanges.subscribe((value) => {
      if (value) {
        this.companyForm.get('phone')!.setValidators(Validators.required);
      } else {
        this.companyForm.get('phone')!.clearValidators();
      }
      this.companyForm.get('phone')!.updateValueAndValidity();
    });
  }

  getCompany(): void {
    this.companyService
      .getCompany(this.companyId)
      .subscribe((company) => this.companyForm.patchValue({
        ...company,
        checkPhone: !!company.phone,
      }));
  }

  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService
        .addCompany(this.companyForm.value)
        .subscribe(() => this.router.navigate(['/company/list']));
    } else {
      const company = { ...this.companyForm.value, id: this.companyId };
      this.companyService
        .updateCompany(company)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }
}
