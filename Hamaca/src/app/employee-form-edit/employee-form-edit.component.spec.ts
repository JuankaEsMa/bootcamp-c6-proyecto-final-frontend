import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormEditComponent } from './employee-form-edit.component';

describe('EmployeeFormEditComponent', () => {
  let component: EmployeeFormEditComponent;
  let fixture: ComponentFixture<EmployeeFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
