import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {TireWagon} from './tire-wagon/tire-wagon';
import {Time} from '@angular/common';
import {RequestService} from '../../services/request/request.service';
import {Request} from '../../models/request/request';
import {MechanicService} from '../mechanicpage/mechanic.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Router} from '@angular/router';
import {RequestStatus} from '../../models/enums/requestStatus';
import {TailType} from "../../models/enums/tailTypeEnums/TailTypes";
import {Boeing737700_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_737_700-TailTypes";
import {Boeing737800_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_737_800-TailTypes";
import {Boeing737900_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_737_900-TailTypes";
import {AirbusA330200_TailTypes} from "../../models/enums/tailTypeEnums/Airbus_A330_200-TailTypes";
import {Boeing747400_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_747_400-TailTypes";
import {Boeing747400F_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_747_400F-TailTypes";
import {Boeing777200_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_777_200-TailTypes";
import {Boeing777300_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_777_300-TailTypes";
import {Boeing7879_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_787_9-TailTypes";

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})

export class RequestFormComponent implements OnInit {
  @ViewChild('form', {static: false}) requestForm: NgForm;
  @ViewChild(TireWagon, {static: false}) tireWagonComponent;

  private popupOpen: boolean = false;
  private popupText: String = '';
  private addIcon: boolean = false;
  private popupTextTimeOut;

  private selectedEquipment = [WagonTypes.EQUIPMENT];
  private locationArray = [];
  private planeType: PlaneTypes = PlaneTypes.VLIEGTUIGTYPE;
  private equipmentList = Object.values(WagonTypes);
  private planeTypeList = Object.values(PlaneTypes);
  private locationSelected: boolean = false;
  private planeTypeEnums = PlaneTypes;
  private equipmentEnums = WagonTypes;
  private tailType = TailType.TAILTYPE;
  private tailTypeList;

  private location: string;
  private deadline;
  private mechanicAnimation: boolean;

  constructor(private meldingService: RequestService, private mechanicRouter: MechanicService,
              private authentication: AuthenticationService, private router: Router) {
    this.deadline = new Date().toLocaleTimeString().substr(0, 5);
  }

  ngOnInit() {
    this.checkIfLoaded();
  }

  private checkIfLoaded() {
    if (this.meldingService.isLoaded == true) {
      this.meldingService.sortEnumsMostUsed(this.equipmentList, WagonTypes.EQUIPMENT);
      this.meldingService.sortEnumsMostUsed(this.planeTypeList, PlaneTypes.VLIEGTUIGTYPE);
    } else {
      setTimeout(() => this.checkIfLoaded(), 500);
    }
  }

  /**f
   * yeet
   * @param newSelectedEquipment
   * @param oldSelectedEquipment
   */
  addEquipment(newSelectedEquipment: WagonTypes, oldSelectedEquipment: WagonTypes, index: number) {
    // Removes the old selected equipment from the list with currently selected equipment
    if (this.selectedEquipment[index] === this.equipmentEnums.EQUIPMENT) {
      this.selectedEquipment[index] = newSelectedEquipment;
    } else {
      this.remove(oldSelectedEquipment);
      this.selectedEquipment.push(newSelectedEquipment);
    }

    // removes the selected equipment from the available equipment list
    for (let i = 0; i < this.equipmentList.length; i++) {
      if (this.equipmentList[i] === newSelectedEquipment) {
        this.equipmentList.splice(i, 1);
      }
    }
  }

  /**
   * Removes an item from the selected equipment list and places it in the list with available equipment
   * @param equipment the piece of equipment that was selected
   */
  remove(equipment) {
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === equipment) {
        this.selectedEquipment.splice(i, 1);
        this.locationArray.splice(i, 1);
      }
    }
    //If the piece of equipment that is being removed from the selected equipment list isn't the default equipment
    //enum, it will place the equipment back in the selectable equipmentlist
    if (equipment !== this.equipmentEnums.EQUIPMENT) {
      this.equipmentList.push(equipment);
    }
  }

  /**
   * yeet
   * @param button
   * @param index
   */
  buttonSelected(button, index) {
    for (let i = 0; i < button.parentNode.childElementCount; i++) {
      (<HTMLButtonElement> button.parentNode.childNodes[i]).classList.remove('btn-selected');
    }

    if (this.locationArray.length > index) {
      this.locationArray[index] = button.innerHTML;
    } else {
      this.locationArray.push(button.innerHTML);
    }

    button.classList.add('btn-selected');
  }

  /**
   * yeet
   * @param planetype
   */
  changeType(planetype: PlaneTypes) {
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === WagonTypes.TIRECART) {
        this.tireWagonComponent.changeType(planetype);
      }
    }
    switch (planetype) {
      case PlaneTypes.AIRBUSA330200: this.selectTailTypeList(AirbusA330200_TailTypes); break;
      case PlaneTypes.AIRBUSA330300: this.selectTailTypeList(AirbusA330200_TailTypes); break;
      case PlaneTypes.BOEING737700: this.selectTailTypeList(Boeing737700_TailTypes); break;
      case PlaneTypes.BOEING737800: this.selectTailTypeList(Boeing737800_TailTypes); break;
      case PlaneTypes.BOEING737900: this.selectTailTypeList(Boeing737900_TailTypes); break;
      case PlaneTypes.BOEING747400: this.selectTailTypeList(Boeing747400_TailTypes); break;
      case PlaneTypes.BOEING747400F: this.selectTailTypeList(Boeing747400F_TailTypes); break;
      case PlaneTypes.BOEING777200: this.selectTailTypeList(Boeing777200_TailTypes); break;
      case PlaneTypes.BOEING777300: this.selectTailTypeList(Boeing777300_TailTypes); break;
      case PlaneTypes.BOEING7879: this.selectTailTypeList(Boeing7879_TailTypes); break;
    }
  }

  selectTailTypeList(tailType) {
    this.tailTypeList = Object.keys(tailType);
  }

  /**
   * yeet
   */
  onSubmit() {
    // closes the popup in case there still is one open
    this.popupOpen = false;

    // Stops the submit function in case some content hasn't been filled in
    if (!this.checkValidity()) {
      return;
    }
  }

  public generateTime() {
    return new Date().toLocaleTimeString();
  }

  /**
   * Checks every possible option in the
   */
  private checkValidity(): boolean {
    let regExp = new RegExp("^[A-Za-z][0-9]+");
    if (this.location === undefined || this.location.trim() === "") {
      //removes the space from the location
      if (this.location !== undefined) {
        this.location = this.location.trim();
      }
      this.openPopup('There\'s no location selected');
      return false;
    }

    if (!regExp.test(this.location)) {
      this.openPopup('Please fill in a valid location');
      return false;
    }

    if (this.deadline === undefined) {
      this.openPopup('There\'s no deadline selected');
      return false;
    }

    // checks if a planetype is selected and displays a popup
    if (this.planeType === PlaneTypes.VLIEGTUIGTYPE) {
      this.openPopup('There\'s no Aircraft type selected');
      return false;
    }

    if (this.tailType === TailType.TAILTYPE) {
      this.openPopup('There\'s no tail type selected');
      return false;
    }

    // Checks if there is any equipment selected and displays a popup
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      let tempEquipemnt = this.selectedEquipment[i];
      if (tempEquipemnt === this.equipmentEnums.EQUIPMENT) {
        this.openPopup('There\'s no equipment selected');
        return false;
      }
    }

    // Checks if all the the locations have been selected, if some are missing a popup will be shown and method stops
    for (let i = 0; i < this.locationArray.length; i++) {
      console.log(this.locationArray[i].length);
      if (this.locationArray[i].length == 0) {
        this.openPopup('There is no location selected for the equipment');
        return false;
      }
    }

    // Checks for each different type of equipment if the equipment specific info has been filled in.
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === WagonTypes.TIRECART) {
        if (this.tireWagonComponent.getTireAmount() < 1) {
          this.openPopup('There\'s no number of tires given');
          return false;
        }
      }
    }

    // loops through the selected equipment array and adds a new request for each piece of equipment, each requests
    // gets the ID of the currently logged in user
    let extraInfo = null;
    let newRequests: Request[] = [];
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === this.equipmentEnums.TIRECART) {
        extraInfo = 'N:' + this.tireWagonComponent.getNoseTires() + ' ,m:' + this.tireWagonComponent.getMainTires();
      }

      let request = new Request(this.authentication.getID(), this.location,
        new Date(new Date().setHours(
          parseInt(this.deadline.toString().substr(0, 3)),
          parseInt(this.deadline.toString().substr(3)), 0, 0)),
        this.planeType, this.tailType, this.selectedEquipment[i], null, this.locationArray[i],
        RequestStatus.Pending, extraInfo, this.authentication.getID(), null, null, new Date());
      this.meldingService.getMeldingen().push(request);
      this.meldingService.getMechanicMeldingen().push(request);
      newRequests.push(request);
    }
    this.meldingService.sortAllRequests();

    this.meldingService.createRequest(newRequests);

    // rerouts the user to the made requests screen after adding all the requests.
    this.mechanicAnimation = true;
    this.meldingService.sortAllRequests();

    setTimeout(() => {
      this.mechanicAnimation = false;
      this.router.navigate(['/mechanic/open-requests']);
    }, 2500);


  }

  private openPopup(text: string): void {
    clearTimeout(this.popupTextTimeOut);
    this.popupOpen = true;
    this.popupText = text;
    this.popupTextTimeOut= setTimeout(() => {
      this.popupOpen = false;
    }, 3000);
  }

  addNewEquipment() {
    this.selectedEquipment.push(WagonTypes.EQUIPMENT);
    this.locationArray.push('');
    this.meldingService.checkPendingStatus();
  }

  public setLocation(location: string) {
    this.location = location;
  }

  public getDeadline(): string {
    return this.deadline;
  }

  public setPlaneType(planeType: PlaneTypes) {
    this.planeType = planeType;
  }

}
