import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './login-animation.component.html',
  styleUrls: ['./login-animation.component.css']
})
export class LoginAnimationComponent implements OnInit {
  @Input() showAnimation = false;

  constructor() {
  }

  ngOnInit() {
  }

}
