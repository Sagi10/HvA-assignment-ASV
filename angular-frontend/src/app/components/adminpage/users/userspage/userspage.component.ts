import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-userspage',
  templateUrl: './userspage.component.html',
  styleUrls: ['./userspage.component.css']
})
export class UserspageComponent implements OnInit {

  constructor(private adminRouter: AdminService) {
  }

  ngOnInit() {
  }

}
