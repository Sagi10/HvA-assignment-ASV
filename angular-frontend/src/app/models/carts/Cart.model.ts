import {WagonTypes} from '../enums/wagonTypes';
import {EquipmentStatus} from '../enums/equipmentStatus';

/**
 * General attributes for CARTS
 */
export class Cart {
  public static readonly WAGON_ICONS = {
    MAINTENANCE: '../../../assets/images/icons/redPointer.png',
    AVAILABLE: '../../../assets/images/icons/greenPointer.png',
    NOT_AVAILABLE: '../../../assets/images/icons/orangePointer.png'
  };
  private id: number;
  private title: string;
  private lat: number;
  private lng: number;
  private carttype: WagonTypes;
  private equipmentStatus: EquipmentStatus;

  constructor(id: number, title: string, lat: number, lng: number, carttype: WagonTypes, equipmentStatus: EquipmentStatus) {
    this.id = id;
    this.title = title;
    this.lat = lat;
    this.lng = lng;
    this.carttype = carttype;
    this.equipmentStatus = equipmentStatus;
  }

  getID() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getLat() {
    return this.lat;
  }

  getLng() {
    return this.lng;
  }

  getCartType() {
    return this.carttype;
  }

  getEquipmentStatus() {
    return this.equipmentStatus;
  }
}
