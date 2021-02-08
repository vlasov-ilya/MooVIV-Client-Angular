import { TestBed } from '@angular/core/testing';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

describe('FetchApiDataService', () => {
  let service: UserRegistrationFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationFormComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let logInService: UserLoginFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    logInService = TestBed.inject(UserLoginFormComponent);
  });

  it('should be good to go', () => {
    expect(logInService).toBeTruthy();
  });
});
