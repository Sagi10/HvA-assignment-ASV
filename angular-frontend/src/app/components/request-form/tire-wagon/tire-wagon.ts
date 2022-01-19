import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {PlaneTypes} from "../../../models/enums/planeTypes";

@Component({
  selector: 'tire-wagon',
  templateUrl: './tire-wagon.html',
  styleUrls: ['./tire-wagon.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TireWagon implements OnInit {
  private differentTireTypes: boolean;
  @Input('planeType') PlaneType: PlaneTypes;


  private noseTires: number;
  private mainTires: number;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.changeType(this.PlaneType);
  }

  changeType(planeType: PlaneTypes) {
    switch (planeType) {
      case PlaneTypes.BOEING737700: this.differentTireTypes = true; break;
      case PlaneTypes.BOEING737800: this.differentTireTypes = true; break;
      case PlaneTypes.BOEING777300: this.differentTireTypes = true; break;
      case PlaneTypes.BOEING7879: this.differentTireTypes = true; break;
      case PlaneTypes.BOEING777200: this.differentTireTypes = true; break;
      case PlaneTypes.BOEING737900: this.differentTireTypes = true; break;
      case PlaneTypes.BOEING747400: this.differentTireTypes = false; break;
      case PlaneTypes.AIRBUSA330200: this.differentTireTypes = true; break;
      case PlaneTypes.AIRBUSA330300: this.differentTireTypes = true; break;
      case PlaneTypes.BOEING747400F: this.differentTireTypes = false; break;
    }
    this.cd.detectChanges();
  }

  // getTireWagon(): TireWagon {
  //   if (this.differentTireTypes) {
  //     return new TireWagon(this.mainTires, this.noseTires)
  //   } else {
  //     return new TireWagon(this.mainTires);
  //   }
  // }

  getNoseTires(): number {
    if (this.noseTires === undefined) {
      return 0;
    }
    return this.noseTires;
  }

  getMainTires(): number {
    if (this.mainTires === undefined) {
      return 0;
    }
    return this.mainTires;
  }

  getTireAmount(): number {
    if (this.noseTires === undefined && this.mainTires === undefined) {
      return 0
    } else if (this.noseTires === undefined) {
      return this.mainTires;
    } else if (this.mainTires === undefined) {
      return this.noseTires;
    } else {
      return this.noseTires + this.mainTires;
    }
  }

}
