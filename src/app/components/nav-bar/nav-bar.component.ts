import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {RequestService} from "../../services/request/request.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentRoute: String[];
  notLoginPage: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authentication: AuthenticationService) {
    this.router.events.subscribe(() => {
      //disables the navbar for the login screen
      this.notLoginPage = this.router.url !== '/signin';
      if (!this.notLoginPage) {
        return;
      }

      //initializes the array and stets the first dash index to 1 so it skips the dash at the start
      this.currentRoute = [];
      let lastDash: number = 0;
      let tempString: String;

      //loops through the url length, checking for every dash and adds a seperate item in the currenRoute array for
      //each string between two dashes. If the loop has reached the end, it will also add the last string to the array
      for (let i = 0; i < this.router.url.length; i++) {
        if (i == 0 && this.router.url.charAt(0) === '/') {
          lastDash = 1;
          continue;
        }
        if (this.router.url.charAt(i) === '/') {
          tempString = this.router.url.substring(lastDash, i);
          tempString = this.fixLink(tempString);
          this.currentRoute.push(tempString);
          lastDash = i + 1;
        } else if (i === this.router.url.length - 1) {
          tempString = this.router.url.substring(lastDash);
          tempString = this.fixLink(tempString);
          this.currentRoute.push(tempString);
        }
      }
    })
  }

  ngOnInit() {}

  //Reformats the links to make sure the display names start with an upper case letter and the rest is lower case.
  private fixLink(string: String): String {
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
  }

  //takes the index(+1) of the clicked link and creates a valid routing string based on how 'deep' the link is
  //in case the second link gets clicked, it will have to take the first and second part of the location array.
  navigate(index: number) {
    let location = "";
    for (let i = 0; i < index; i++) {
      location += "/" + this.currentRoute[i];
    }
    this.router.navigate([location.toLowerCase()]);
  }

  logOut() {
    this.authentication.signOut();
    // this.meldingService.ngOnDestroy();
    this.router.navigate(['/signin']);
  }
}
