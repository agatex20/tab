import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesTypesComponent } from './leaves-types.component';

describe('LeavesTypesComponent', () => {
  let component: LeavesTypesComponent;
  let fixture: ComponentFixture<LeavesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
