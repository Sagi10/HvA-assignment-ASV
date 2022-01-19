import {Component, OnInit} from '@angular/core';
import {WagonTypes} from '../../../../models/enums/wagonTypes';
import {NgForm} from '@angular/forms';
import {WagonsService} from '../../../../services/wagons/wagons.service';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-equipments-create',
  templateUrl: './equipments-create.component.html',
  styleUrls: ['./equipments-create.component.css']
})
export class EquipmentsCreateComponent implements OnInit {
  public showMessage = false;
  public equipmentFunctionList;

  constructor(private adminRouter: AdminService, private wagonsService: WagonsService) {
  }

  ngOnInit() {
    this.equipmentFunctionList = WagonTypes;
  }

  /**
   * This method will use the @WagonsService createNewWagon method
   * to create a new user and provide the user with an message, after that the form will be cleared out
   *
   * @param form the form that the user is filling in
   */
  createNewWagon(form: NgForm) {
    this.showMessage = true;
    const title = form.value.title;
    const type = form.value.type;

    // this.wagonsService.createNewWagon({title, type});

    setTimeout(() => {
      this.showMessage = false;
      form.reset();
    }, 4000);
  }
}
