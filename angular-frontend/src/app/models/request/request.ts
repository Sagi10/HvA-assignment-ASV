import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';
import {RequestStatus} from '../enums/requestStatus';
import {TailType} from '../enums/tailTypeEnums/TailTypes';
import {Cart} from '../carts/Cart.model';

export class RequestBuilder {
  private readonly request: Request;

  constructor() {
    this.request = new Request();
    this.request.status = RequestStatus.Pending;
    this.request.requestCreated = new Date(Date.now());
  }

  public setId(id): RequestBuilder {
    this.request.id = id;
    return this;
  }

  public setLocation(location: string): RequestBuilder {
    this.request.location = location;
    return this;
  }

  public setDeadline(deadline: Date): RequestBuilder {
    this.request.deadline = deadline;
    return this;
  }

  public setPlaneType(planeType: PlaneTypes): RequestBuilder {
    this.request.planeType = planeType;
    return this;
  }

  public setTailType(tailType: TailType): RequestBuilder {
    this.request.tailType = tailType;
    return this;
  }

  public setWagonType(wagonType: WagonTypes): RequestBuilder {
    this.request.wagonType = wagonType;
    return this;
  }

  public setSelectedWagon(selectedWagon: number): RequestBuilder {
    this.request.selectedWagon = selectedWagon;
    return this;
  }

  public setPosition(position: string): RequestBuilder {
    this.request.position = position;
    return this;
  }

  public setStatus(status: RequestStatus): RequestBuilder {
    this.request.status = status;
    return this;
  }

  public setExtraInfo(extraInfo: string): RequestBuilder {
    this.request.extraInfo = extraInfo;
    return this;
  }

  public setMechanic(mechanicId: number): RequestBuilder {
    this.request.mechanicId = mechanicId;
    return this;
  }

  public setDeliveryTime(deliveryTime: Date): RequestBuilder {
    this.request.deliveryTime = deliveryTime;
    return this;
  }

  public setCompletionTime(completionTime: Date): RequestBuilder {
    this.request.completionTime = completionTime;
    return this;
  }

  public setRequestCreated(requestCreated: Date): RequestBuilder {
    this.request.requestCreated = requestCreated;
    return this;
  }

  public build() {
    return this.request;
  }
}

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

  /**
   * This method is used on the MapComponent for letting the runner pick a Cart that he or she's using
   *
   * @param cart the selected cart on the map
   */
  public pickCart(cart: Cart) {
    this.selectedWagon = cart.getID();
  }
}


