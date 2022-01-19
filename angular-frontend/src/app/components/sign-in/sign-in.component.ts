import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public showWarning = null; // to show warning message
  public animationQueue = false; // sign in animation
  private users;

  constructor(private authentication: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
  }

  /**
   * This method will take the username and password from the filled in form and
   * show message on the screen when login went wrong.
   */
  signIn(signInForm: NgForm) {
    const username: string = signInForm.form.value.email;
    const password: string = signInForm.form.value.password;

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;

      this.animationQueue = true;
      setTimeout(() => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].email === username && this.users[i].password === password) {
            this.showWarning = false; // hide warning message when showed
            this.animationQueue = false; // stop animation after checking password and username
            this.authentication.createUser(this.users[i]); // create instance of a user for the application
            this.authentication.login(); // show the right page for the signed in user
          } else {
            this.showWarning = true; // show warning message
            this.animationQueue = false; // stop animation¶
          }
        }
      }, 1000);
    });
  }

}
