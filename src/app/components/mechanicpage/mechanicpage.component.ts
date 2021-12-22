import { Component, OnInit } from '@angular/core';
import {RunnerService} from '../runnerpage/runner.service';
import {MechanicService} from './mechanic.service';

@Component({
  selector: 'app-mechanicpage',
  templateUrl: './mechanicpage.component.html',
  styleUrls: ['./mechanicpage.component.css']
})
export class MechanicpageComponent implements OnInit {
  constructor(private mechanicRouter: MechanicService) {
  }

  ngOnInit() {
  }
}
