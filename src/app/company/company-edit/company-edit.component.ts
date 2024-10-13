import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';

type CompanyFormGroup = {
  [K in keyof Company]: FormControl<Company[K]>;
} & {
  checkPhone: FormControl<boolean | null>;
};

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent implements OnInit {
  isNewCompany!: boolean;
  companyForm!: FormGroup<CompanyFormGroup>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    const companyId = +this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !companyId;
    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany(companyId);
    }
  }

  buildForm(): void {
    this.companyForm = this.fb.group({
      id: this.fb.control(0),
      name: this.fb.control('', Validators.required),
      checkPhone: this.fb.control(false),
      phone: this.fb.control(''),
      email: this.fb.control('', Validators.email),
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

  getCompany(companyId: number): void {
    this.companyService.getCompany(companyId).subscribe((company) =>
      this.companyForm.patchValue({
        ...company,
        checkPhone: !!company.phone,
      }),
    );
  }

  saveCompany(): void {
    const company = this.companyForm.value as unknown as Company;
    if (this.isNewCompany) {
      this.companyService
        .addCompany(company)
        .subscribe(() => this.router.navigate(['/company/list']));
    } else {
      this.companyService
        .updateCompany(company)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }
}
