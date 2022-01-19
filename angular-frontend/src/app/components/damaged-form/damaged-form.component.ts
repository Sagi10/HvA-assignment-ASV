import {Component, OnInit, ViewChild} from '@angular/core';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {NgForm} from '@angular/forms';
import {MechanicService} from '../mechanicpage/mechanic.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {RequestService} from '../../services/request/request.service';
import {WagonsService} from '../../services/wagons/wagons.service';
import {RequestStatus} from "../../models/enums/requestStatus";

@Component({
  selector: 'app-damaged-form',
  templateUrl: './damaged-form.component.html',
  styleUrls: ['./damaged-form.component.css']
})
export class DamagedFormComponent implements OnInit {
  public index = this.meldingenService.index;
  private showform: boolean = false;
  private popupOpen: boolean = false;
  private planeTypeList = Object.values(PlaneTypes);
  private planeType: PlaneTypes = PlaneTypes.VLIEGTUIGTYPE;
  private currentTime = new Date().toLocaleTimeString().substring(0, 5);

  @ViewChild('damageForm', {static: false}) damageForm: NgForm;


  constructor(private mechanicRouter: MechanicService, private authentication: AuthenticationService,
              private meldingenService: RequestService, private wagonService: WagonsService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    // this.popupOpen = true;
    // setTimeout(() => {
    //   this.popupOpen = false;
    // }, 3000);
  }

  /**
   * Hides the form when its confirmed.
   * names can be changed in something better.
   */
  bevestigd() {
    this.showform = false;
    this.popupOpen = true;
    this.meldingenService.getMechanicMeldingen()[this.index].status = RequestStatus.Pending;
    this.meldingenService.test = false;
    const cartID = this.meldingenService.getMechanicMeldingen()[this.meldingenService.index].selectedWagon;
    this.wagonService.getCartByID(cartID).subscribe(cart => {
      const angularCart = this.wagonService.createCart(cart[0]);
      this.wagonService.changeCartStatus(angularCart, 'UNAVAILABLE');
      this.meldingenService.getMechanicMeldingen()[this.index].selectedWagon = 0;
    });

    setTimeout(() => {
      this.popupOpen = false;
    }, 2500);

    this.meldingenService.updateRequest(this.meldingenService.getMechanicMeldingen()[this.index])
  }

  onSumbitDamageForm(damageForm: NgForm) {
  }

  getShowForm(): boolean {
    return this.showform;
  }
}
