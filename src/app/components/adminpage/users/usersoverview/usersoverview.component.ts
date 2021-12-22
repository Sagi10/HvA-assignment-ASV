import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../admin.service';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-usersoverview',
  templateUrl: './usersoverview.component.html',
  styleUrls: ['./usersoverview.component.css']
})
export class UsersoverviewComponent implements OnInit {
  public userSearch: string;
  public users;

  constructor(private adminRouter: AdminService, private userService: UserService) {
  }

  ngOnInit() {
    this.refreshList();
  }

  public refreshList() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

}
