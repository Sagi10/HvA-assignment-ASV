import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../admin.service';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {Functions} from '../../../../models/staff/Functions';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {
  public showMessage = false;
  public rolesList;

  constructor(private adminRouter: AdminService, private userService: UserService) {
  }

  ngOnInit() {
    this.rolesList = Functions;
  }

  /**
   * This method will use the @AuthenticationService createNewUser method
   * to create a new user and prodive the user with an message, after that the form will be cleared out
   *
   * @param form the form that the user is filling in
   */
  createNewUser(form: NgForm) {
    this.showMessage = true;
    const email = form.value.email;
    const password = form.value.password;
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const role = form.value.role;

    this.userService.createUser(email, firstname, lastname, password, role);

    setTimeout(() => {
      this.showMessage = false;
      form.reset();
    }, 4000);
  }


}
