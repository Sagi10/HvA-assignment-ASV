import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {WagonsService} from '../../../../services/wagons/wagons.service';
import {AdminService} from '../../admin.service';
import {Cart} from '../../../../models/carts/Cart.model';

@Component({
  selector: 'app-equipmentsoverview',
  templateUrl: './equipmentsoverview.component.html',
  styleUrls: ['./equipmentsoverview.component.css']
})
export class EquipmentsoverviewComponent implements OnInit {
  public equipmentSearch: string;
  public carts = [];

  constructor(private adminService: AdminService, private wagonsService: WagonsService) {
  }

  ngOnInit() {
    this.wagonsService.getAllCarts().subscribe(data => {
      this.carts = data;
    });
  }

}
