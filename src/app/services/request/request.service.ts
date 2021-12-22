import {Injectable, OnInit} from '@angular/core';
import {Request} from '../../models/request/request';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {RequestStatus} from '../../models/enums/requestStatus';

@Injectable({
  providedIn: 'root'
})

export class RequestService implements OnInit {
  private TIMEOUT_INTERVAL: number = 10000;
  private lastUserRole: String;
  private interval;
  public alleMeldingen: Request[] = [];                      //
  public meldingen: Request[] = [];
  public mechanicMeldingen: Request[] = [];                  // Array van meldingen voor de actieve mechanic
  private readonly URL: string = 'http://localhost:8080';
  public time = new Date().toLocaleTimeString();
  public index: number = 0;
  public pendingTextCheck = true;
  public collectTextCheck = true;
  public deliveredTextCheck = true;
  public counter = 0;
  public counter2 = 0;
  public counter3 = 0;
  public counter4 = 0;
  public isLoaded: boolean;
  public test = false;

  constructor(private httpClient: HttpClient, private router: Router, private authentication: AuthenticationService) {
    this.loadAllRequests();
  }

  ngOnInit() {
  }

  public loadAllRequests() {
    //Check to see if the shit has to be reloaded or not due to switching accouts
    //Checks that a user has logged in before and that the roles are the same, stops the method from continueing
    if (this.lastUserRole !== undefined && this.lastUserRole === this.authentication.getUser().getRole()) {
      return;
      //Checks if the user has logged in before and if the roles are different, empties all arrays and continues
    } else if (this.lastUserRole !== undefined && this.lastUserRole !== this.authentication.getUser().getRole()) {
      this.isLoaded = false;
      this.lastUserRole = this.authentication.getUser().getRole();
      this.alleMeldingen = [];
      this.meldingen = [];
      this.mechanicMeldingen = [];
    } else {
      // this.lastUserRole = this.authentication.getUser().getRole();
    }

    this.getAllMeldingenFromSpring().subscribe((requests) => {
      for (let i = 0; i < requests.length; i++) {
        this.alleMeldingen.push(
          new Request(requests[i].id, requests[i].location,
            new Date(Date.parse(<string> <unknown> requests[i].deadline)),
            requests[i].planeType, requests[i].tailType, requests[i].wagonType, requests[i].selectedWagon,
            requests[i].position, requests[i].status, requests[i].extraInfo, requests[i].mechanicId,
            new Date(Date.parse(<string> <unknown> requests[i].deliveryTime)),
            new Date(Date.parse(<string> <unknown> requests[i].completionTime)),
            new Date(Date.parse(<string> <unknown> requests[i].requestCreated))
          ));
      }

      //loops through every request that has been made
      for (let i = 0; i < this.alleMeldingen.length; i++) {

        //checks for any request that has been made on the current date, adds the requests to the meldingen list
        if (this.alleMeldingen[i].deadline.getDate() == new Date().getDate()) {
          this.meldingen.push(this.alleMeldingen[i]);

          // checks if the request are made by the currently logged in employee
          if (this.alleMeldingen[i].mechanicId === this.authentication.getID()) {
            this.mechanicMeldingen.push(this.meldingen[i]);
          }
        }
      }
      this.sortAllRequests();
      this.isLoaded = true;

      if (this.interval !== undefined) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => this.getUpdatedOrNewRequests(), this.TIMEOUT_INTERVAL);
    });
  }

  checkPendingStatus() {
    if (this.authentication.getUser().getRole() == 'RUNNER') {
      for (let i = 0; i < this.meldingen.length; i++) {
        if (this.meldingen[i].status == RequestStatus.Pending || this.meldingen[i].status == RequestStatus.Accepted) {
          this.counter++;
        }
      }
      if (this.counter > 0) {
        this.counter = 0;
        this.pendingTextCheck = true;
      } else {
        this.pendingTextCheck = false;
      }
    } else {
      for (let i = 0; i < this.mechanicMeldingen.length; i++) {
        if (this.mechanicMeldingen[i].status == RequestStatus.Pending || this.mechanicMeldingen[i].status == RequestStatus.Accepted) {
          this.counter4++;
        }
      }
      if (this.counter4 > 0) {
        this.counter4 = 0;
        this.pendingTextCheck = true;
      } else {
        this.pendingTextCheck = false;
      }
    }
  }

  checkCollectStatus() {
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].status == RequestStatus.Collect) {
        this.counter2++;
      }
    }
    if (this.counter2 > 0) {
      this.counter2 = 0;
      this.collectTextCheck = true;
    } else {
      this.collectTextCheck = false;
    }
  }

  checkDeliveredStatus() {
    for (let i = 0; i < this.mechanicMeldingen.length; i++) {
      if (this.mechanicMeldingen[i].status == RequestStatus.Delivered) {
        this.counter3++;
      }
    }
    if (this.counter3 > 0) {
      this.counter3 = 0;
      this.deliveredTextCheck = true;
    } else {
      this.deliveredTextCheck = false;
    }
  }

  public getAllMeldingenFromSpring(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(this.URL + '/open-requests');
  }

  // Sorts both the general requests and the mechanic requests from earliest to latest by deadline
  public sortAllRequests() {
    this.meldingen = this.meldingen.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      } else if (a.deadline > b.deadline) {
        return 1;
      } else {
        return 0;
      }
    });

    this.mechanicMeldingen = this.mechanicMeldingen.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      } else if (a.deadline > b.deadline) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  public sortRequestsByDate(requests: Request[]) {
    requests = requests.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      } else if (a.deadline > b.deadline) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public generateRandomId() {
    return Math.floor(Math.random() * 100 + 1);
  }

  public getAlleMeldingen(): Request[] {
    return this.alleMeldingen;
  }


  public bezorgd(index: number) {
    this.meldingen[index].status = RequestStatus.Delivered;
    this.updateRequest(this.meldingen[index]);
    this.checkDeliveredStatus();
    this.router.navigate(['/runner/open-requests']);
  }

  public getMeldingen(): Request[] {
    return this.meldingen;
  }

  public getMechanicMeldingen(): Request[] {
    return this.mechanicMeldingen;
  }

  public sortEnumsMostUsed(list: string[], enumType: PlaneTypes.VLIEGTUIGTYPE | WagonTypes.EQUIPMENT): void {
    let newList = [];
    if (enumType === PlaneTypes.VLIEGTUIGTYPE) {
      //Adds the first planetype to the newList, since it can't check for existing values if the newList is empty
      newList.push({type: this.alleMeldingen[0].planeType, amount: 1});

      //loops through every request or a max of 50 requests, has the outer tag to be called by the inner loop
      outer: for (let i = 1; i < 50 && i < this.alleMeldingen.length; i++) {
        /*
         * loops through every item in the new list, checks if the type is already in the list.
         * If the type is already in the list the number will be increased by 1 and continues outer loop,
         * otherwise it will set the amount to 1.
         */
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === this.alleMeldingen[i].planeType) {
            newList[j].amount = newList[j].amount + 1;
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: this.alleMeldingen[i].planeType, amount: 1});
          }
        }
      }

      //loops through every planetype to check if any of the planetypes are still missing from the list.
      outer: for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === list[i]) {
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: list[i], amount: 0});
          }
        }
      }
    } else if (enumType === WagonTypes.EQUIPMENT) {
      //Adds the first planetype to the newList, since it can't check for existing values if the newList is empty
      newList.push({type: this.alleMeldingen[0].wagonType, amount: 1});

      //loops through every request or a max of 50 requests, has the outer tag to be called by the inner loop
      outer: for (let i = 1; i < 50 && i < this.alleMeldingen.length; i++) {
        /*
         * loops through every item in the new list, checks if the type is already in the list.
         * If the type is already in the list the number will be increased by 1 and continues outer loop,
         * otherwise it will set the amount to 1.
         */
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === this.alleMeldingen[i].wagonType) {
            newList[j].amount = newList[j].amount + 1;
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: this.alleMeldingen[i].wagonType, amount: 1});
          }
        }
      }

      //loops through every planetype to check if any of the planetypes are still missing from the list.
      outer: for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === list[i]) {
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: list[i], amount: 0});
          }
        }
      }
    }

    //Sorts the list based on the amount of times it has been used
    newList.sort((a, b) => b.amount - a.amount);
    // Checks if the lists are the same size (should always be correct), sets the list as the sorted list.
    if (newList.length === list.length) {
      for (let i = 0; i < list.length; i++) {
        list[i] = newList[i].type;
      }
    }
  }

  public getUpdatedOrNewRequests(): void {
    //checks if the user is still signed in, doensn't do shit when not logged in |:^)
    if (this.authentication.getUser() === null) {
      return;
    }

    let id = 0;
    if (this.authentication.getUser().getRole() === 'MECHANIC') {
      id = this.authentication.getID();
    }
    this.httpClient.get(this.URL + '/open-requests/changed-requests/' + id).subscribe((requests) => {
      let updatedRequests: Request[] = <Request[]> requests;

      if (updatedRequests[0] == undefined) {
        return;
      }

      for (let i = 0; i < updatedRequests.length; i++) {
        updatedRequests[i] =
          new Request(requests[i].id, requests[i].location,
            new Date(Date.parse(<string> <unknown> requests[i].deadline)),
            requests[i].planeType, requests[i].tailType, requests[i].wagonType, requests[i].selectedWagon,
            requests[i].position, requests[i].status, requests[i].extraInfo, requests[i].mechanicId,
            new Date(Date.parse(<string> <unknown> requests[i].deliveryTime)),
            new Date(Date.parse(<string> <unknown> requests[i].completionTime)),
            new Date(Date.parse(<string> <unknown> requests[i].requestCreated))
          );
      }

      //Updates the requests if they've already been loaded
      for (let i = 0; i < this.meldingen.length; i++) {
        second: for (let j = 0; j < updatedRequests.length; j++) {
          if (this.meldingen[i].id == updatedRequests[j].id) {
            this.meldingen[i] = updatedRequests[j];
            if (updatedRequests[j].mechanicId === this.authentication.getID()) {
              for (let k = 0; k < this.mechanicMeldingen.length; k++) {
                //Skips current mechanic request if it has just been created and id hasn't been received by id yet
                if (this.mechanicMeldingen[k].id === undefined)
                  continue;

                if (this.mechanicMeldingen[k].id === updatedRequests[j].id) {
                  this.mechanicMeldingen[k] = updatedRequests[j];

                  if (this.mechanicMeldingen[k].status === RequestStatus.Delivered) {
                    this.shopPopup('Equipment has been delivered at ' + this.mechanicMeldingen[k].location);
                  }
                  updatedRequests.splice(j, 1);
                  j--;
                  continue second;
                }

              }
            }

            if (updatedRequests[j].status === RequestStatus.Collect) {
              this.shopPopup('Equipment needs to be collected at ' + this.meldingen[i].location);
            }
            updatedRequests.splice(j, 1);
          }
        }
      }

      //adds the new requests to the request lists
      for (let i = 0; i < updatedRequests.length; i++) {
        this.meldingen.push(updatedRequests[i]);
        this.mechanicMeldingen.push(updatedRequests[i]);

        if (this.authentication.getUser().getRole() == 'RUNNER') {
          this.shopPopup('A new Request has been made');
        }

      }
      this.checkCollectStatus();
      this.checkDeliveredStatus();
      this.checkPendingStatus();
      this.sortAllRequests();
    });
  }

  public updateRequest(melding: Request): void {
    this.httpClient.post(this.URL + '/open-requests/update-request/' + melding.id, melding.status).subscribe(() => {
      this.checkCollectStatus();
      this.checkDeliveredStatus();
      this.checkPendingStatus();
    });
  }

  public deleteRequest(id: number): void {
    this.httpClient.delete(this.URL + '/open-requests/' + id).subscribe(response => {
      this.checkCollectStatus();
      this.checkDeliveredStatus();
      this.checkPendingStatus();
    });
  }

  private shopPopup(popupText: string) {
    //stops method from doing shit if the user has logged out
    if (this.authentication.getUser() === null) {
      return;
    }

    let body = document.getElementsByTagName('BODY')[0];
    let popupDiv = document.createElement('DIV');
    let popupSpan = document.createElement('SPAN');

    popupDiv.classList.add('popup');
    popupSpan.innerHTML = popupText;

    body.appendChild(popupDiv);
    popupDiv.appendChild(popupSpan);
    popupDiv.setAttribute('style', 'margin-left: -' + (popupDiv.offsetWidth / 2) + 'px');

    setTimeout(() => body.removeChild(popupDiv), 4000);
  }

  createRequest(request: Request[]) {
    this.httpClient.post(this.URL + '/users/' + this.authentication.getID() + '/open-requests', request).subscribe(data => {
      let requestIds: number[] = <number[]> data;

      for (let i = 0; i < requestIds.length; i++) {
        request[i].id = requestIds[i];
      }
    });
  }

  makeRequest(request: Request){
    this.meldingen.push(request);
  }

  getRequesetById(requestId: number): Request {
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id == requestId) {
        return this.meldingen[i];
      }
    }
  }

  AcceptstatusRequest(id: number) {
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id == id) {
        this.meldingen[i].status = RequestStatus.Accepted;
        return this.meldingen[i].status;
      }
    }
  }

  deliverstatusRequest(id: number) {
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id == id) {
        this.meldingen[i].status = RequestStatus.Delivered;
        return this.meldingen[i].status;
      }
    }
  }

  finishedstatusRequest(id: number) {
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id == id) {
        this.meldingen[i].status = RequestStatus.Finished;
        return this.meldingen[i].status;
      }
    }
  }

  selectedwagonchange(id: number) {
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id == id) {
        this.meldingen[i].selectedWagon = 35;
        return this.meldingen[i].selectedWagon;
      }
    }
  }
}
