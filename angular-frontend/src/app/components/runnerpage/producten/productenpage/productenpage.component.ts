import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../adminpage/admin.service';
import {RunnerService} from '../../runner.service';

@Component({
  selector: 'app-productenpage',
  templateUrl: './productenpage.component.html',
  styleUrls: ['./productenpage.component.css']
})
export class ProductenpageComponent implements OnInit {

  constructor(private runnerRouter: RunnerService) {
  }

  ngOnInit() {
  }

}
