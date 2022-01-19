import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../../services/request/request.service';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-system-logs',
  templateUrl: './system-logs.component.html',
  styleUrls: ['./system-logs.component.css']
})
export class SystemLogsComponent implements OnInit {
  private systemLogSearchInput;

  constructor(private adminService: AdminService, private meldingService: RequestService) {
  }

  ngOnInit() {
  }

}
