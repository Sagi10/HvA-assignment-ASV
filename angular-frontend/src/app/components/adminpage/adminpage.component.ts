import {Component} from '@angular/core';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {

  constructor(public adminService: AdminService) {
  }
}
