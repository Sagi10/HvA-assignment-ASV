import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {AppComponent} from '../../app.component';
import {SignInComponent} from '../../components/sign-in/sign-in.component';
import {Employee} from '../../models/staff/Employee';
import {FormsModule} from "@angular/forms";
import {LoginAnimationComponent} from "../../components/global/login-animation/login-animation.component";

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule, RouterModule, FormsModule
    ],
    providers: [AuthenticationService],
    declarations: [SignInComponent, LoginAnimationComponent]
  }));

  beforeEach(() => {
    const user = new Employee('test', 'test', 'test@gmail.com', 'heyYeah', 'MECHANIC', 25);
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
