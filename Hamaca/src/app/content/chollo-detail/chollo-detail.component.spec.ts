import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CholloDetailComponent } from './chollo-detail.component';

describe('CholloDetailComponent', () => {
  let component: CholloDetailComponent;
  let fixture: ComponentFixture<CholloDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CholloDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CholloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
