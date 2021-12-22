import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-equipmentspage',
  templateUrl: './equipmentspage.component.html',
  styleUrls: ['./equipmentspage.component.css']
})
export class EquipmentspageComponent implements OnInit {

  constructor(private adminRouter: AdminService) {
  }

  ngOnInit() {
  }

}
