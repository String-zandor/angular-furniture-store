import { TestBed } from '@angular/core/testing';

import { ResetPwdGuard } from './reset-pwd.guard';

describe('ResetPwdGuard', () => {
  let guard: ResetPwdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResetPwdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
