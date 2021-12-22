import {Injectable} from '@angular/core';
import {Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {
  private subscription: Subscription;
  public hideNavButtons = false;
  public currentRoute: string;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.subscription = this.router.events.subscribe((params: Params) => {
      if (params.url === '/mechanic') { // hide main buttons to load the router-outlet content
        this.hideNavButtons = false;
      } else {
        this.hideNavButtons = true;
      }

      if (params.url) { // check if url is not undefined
        this.currentRoute = `${params.url}`; // convert url to string
      }
    });
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }

}
