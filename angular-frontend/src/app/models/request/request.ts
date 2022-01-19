import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';
import {RequestStatus} from '../enums/requestStatus';
import {TailType} from '../enums/tailTypeEnums/TailTypes';
import {Cart} from '../carts/Cart.model';

export class Request {
  id: number;
  location: string;
  deadline: Date;
  planeType: PlaneTypes;
  tailType: TailType;
  wagonType: WagonTypes;
  selectedWagon: number;
  position: string;
  status: RequestStatus;
  extraInfo: string;
  mechanicId: number;
  deliveryTime: Date;
  completionTime: Date;
  requestCreated: Date;

  constructor(id: number, location: string, deadline: Date, planetype: PlaneTypes,
              tailtype: TailType, wagonType: WagonTypes, selectedWagon, position: string,
              status: RequestStatus, extraInfo: string, mechanicId: number, deliveryTime: Date, completionTime: Date, requestCreated: Date) {
    this.id = id;
    this.location = location;
    this.deadline = deadline;
    this.planeType = planetype;
    this.tailType = tailtype;
    this.wagonType = wagonType;
    this.selectedWagon = selectedWagon;
    this.position = position;
    this.status = status;
    this.extraInfo = extraInfo;
    this.mechanicId = mechanicId;
    this.deliveryTime = deliveryTime;
    this.completionTime = completionTime;
    this.requestCreated = requestCreated;
  }

  /**
   * This method is used on the MapComponent for letting the runner pick a Cart that he or she's using
   *
   * @param cart the selected cart on the map
   */
  public pickCart(cart: Cart) {
    this.selectedWagon = cart.getID();
  }
}


