import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompanyTableComponent } from './company-table.component';

describe('CompanyTableComponent', () => {
  let component: CompanyTableComponent;
  let fixture: ComponentFixture<CompanyTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CompanyTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create have a table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should create have a row per company', () => {
    component.companies = [
      { id: 1, name: 'Company 1', email: '', phone: 123 },
      { id: 2, name: 'Company 2', email: '', phone: 123 },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('table > tbody > tr');
    expect(rows.length).toBe(0);
  });

  it('should emit a delete event', () => {
    const company = { id: 1, name: 'Company 1', email: '', phone: 123 };
    spyOn(component.deleteCompanyClicked, 'emit');
    component.deleteCompany(company);
    expect(component.deleteCompanyClicked.emit).toHaveBeenCalledWith(company);
  });
});
