import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationStatusPage } from './operation-status-page';

describe('OperationStatusPage', () => {
  let component: OperationStatusPage;
  let fixture: ComponentFixture<OperationStatusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationStatusPage],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationStatusPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
