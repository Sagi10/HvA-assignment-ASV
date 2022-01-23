import {Injectable} from '@angular/core';
import {Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private subscription: Subscription;
  public hideNavButtons = false;
  public currentRoute: string;

  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((params: Params) => {
      this.hideNavButtons = params.url !== '/admin';
      if (params.url) { // check if url is not undefined
        this.currentRoute = `${params.url}`; // convert url to string
      }
    });
  }
}
