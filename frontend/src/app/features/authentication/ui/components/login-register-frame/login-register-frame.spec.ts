import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterFrame } from './login-register-frame';

describe('LoginRegisterFrame', () => {
  let component: LoginRegisterFrame;
  let fixture: ComponentFixture<LoginRegisterFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterFrame],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterFrame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
