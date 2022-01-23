import {Component} from '@angular/core';
import {MechanicService} from './mechanic.service';

@Component({
    selector: 'app-mechanicpage',
    templateUrl: './mechanicpage.component.html',
    styleUrls: ['./mechanicpage.component.css']
})
export class MechanicpageComponent {
    constructor(private mechanicRouter: MechanicService) {
    }
}
