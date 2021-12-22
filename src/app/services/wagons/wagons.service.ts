import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../../models/carts/Cart.model';
import {Observable} from 'rxjs';
import {icon, marker} from 'leaflet';
import {RequestService} from '../request/request.service';

declare let L; // used for Leaflet.js
@Injectable({
  providedIn: 'root'
})
export class WagonsService {
  private readonly URL = 'http://localhost:8080/carts'; // springboot url for the carts
  public pickedWagon = false;

  /**
   * Will hold all the markers for a specific cart
   */
  private cartMarkers = {
    EQUIPMENT: [] = [],
    TIRECART: [] = [],
    NITROGENCART: [] = [],
    SKYDROLWAGEN: [] = [],
    BRAKES_CART: [] = [],
    IDG_CART: [] = [],
    SKYDROL_CART: [] = [],
    HYJET5: [] = [],
    HEATER_POLAR_CART: [] = [],
    FUEL_CART: [] = [],
    WORKING_LIFT_PLATFORM: [] = [],
    TECHNICAL_STAIRS: [] = [],
    DRAIN_CART_FUEL: [] = [],
    DRAIN_CART_SKYDROL: [] = [],
    WORK_LIFT: [] = [],
    SKYDROL_HYDRAULIC_FUEL_CART: [] = [],
    HYJET5_HYDRAULIC_FLUID_CART: [] = [],
    PUMP_STAIRS: [] = [],
    PYLON_STAIRS: [] = [],
    BRAKES_COOLER: [] = [],
    COOLING_CART: [] = [],
    POLAR_HEATER: [] = [],
    HEATER: [] = [],
    AIR_DATA_CART: [] = [],
    SPILL_CART: [] = [],
    HOIST_CART: [] = [],
    GREASE_CART: [] = [],
    CLEANING_CART: [] = [],
    SPILL_KIT_CART: [] = []
  };

  constructor(private http: HttpClient, private requestService: RequestService) {
  }

  // TODO: use http call to create new wagon

  /**
   * This method will return a layer of markers of the carts
   *
   * @param cartAppName string value of frontend enum
   */
  public getLayer(cartAppName) {
    const cartName = this.translateAppEquipmentEnumToSpring(cartAppName); // translate the app enum to spring
    return {[cartAppName]: L.layerGroup(this.cartMarkers[cartName])}; // return object with name and value of the layers
  }

  /**
   * This method will find a specific type of cart out of all the carts
   *
   * @param cartType the type of wagon, based on Cart
   */
  public getCartsByType(cartType: string) {
    const springBootEnum = this.translateAppEquipmentEnumToSpring(cartType);
    return this.http.get<Cart[]>(`${this.URL}/?type=${springBootEnum}`);
  }

  /**
   * This method returns a cart by the given id
   *
   * @param id - the id of a Cart
   */
  public getCartByID(id: number) {
    return this.http.get<Cart>(`${this.URL}/?id=${id}`);
  }

  /**
   * This method will return observable with all the carts from the database
   */
  public getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.URL);
  }

  /**
   * This method will make a cartModel from SpringBoot cart
   *
   * @param cart springBoot httpCart
   */
  public createMarker(cart) {
    const createdCart = this.createCart(cart);
    this.cartMarkers[cart.carttype].push(
      this.newMarker(createdCart)
    );
  }

  /**
   * This method will create a new TypeScript object of a Cart
   *
   * @param cart - the data of a Cart provided from springBoot
   */
  public createCart(cart) {
    return new Cart(
      cart.id,
      cart.title,
      cart.lat,
      cart.lng,
      cart.carttype,
      cart.equipmentStatus
    );
  }

  /**
   * This method will change the status of a Cart
   *
   * @param cart - the Cart that the status should change of
   * @param status - the status that a Cart should change to
   */
  public changeCartStatus(cart: Cart, status: string) {
    this.http.post(`${this.URL}/change-status/?id=${cart.getID()}&status=${status}`, {}).subscribe();
  }

  /**
   * This method will empty the markers arrays
   */
  public resetMarkers() {
    for (let prop in this.cartMarkers) {
      if (Object.prototype.hasOwnProperty.call(this.cartMarkers, prop)) {
        if (this.cartMarkers[prop] != null) {
          this.cartMarkers[prop] = [];
        }
      }
    }
  }

  public getMarkers() {
    return this.cartMarkers;
  }

  public bindCartToRequest(cartId: number, requestId: number) {
    this.http.post(`http://localhost:8080/add-cart-to-request/${requestId}/${cartId}`, null).subscribe(() => {
      this.requestService.getRequesetById(requestId).selectedWagon = cartId;
    });
  }

  /**
   * This method will return a Marker with value of the given Cart,
   * if the status is not equal to AVAILABLE then that marker don't get a popup
   *
   * @param cart - Cart that a marker should be made for
   */
  private newMarker(cart: Cart) {
    const iconURL = this.getCartIconUrl(cart.getEquipmentStatus());
    let createdMarker;
    // @ts-ignore
    if (this.pickedWagon === false && cart.getEquipmentStatus() === 'AVAILABLE') { // only markers with AVAILABLE status gets popup
      createdMarker = marker([cart.getLat(), cart.getLng()], {
        icon: icon({
          iconSize: [35, 35],
          iconAnchor: [13, 5],
          iconUrl: iconURL
        })
      }).bindPopup(`<h5 style="font-weight: bold; text-align: center">${cart.getTitle()} (${cart.getID()})</h5>
        <button class="btn btn-primary btn-block btn-pick-cart" data-cart-id=${cart.getID()}>Pick this Cart</button>`);
    } else if (this.pickedWagon === true) { // when User already chosen a cart
      createdMarker = marker([cart.getLat(), cart.getLng()], {
        icon: icon({
          iconSize: [35, 35],
          iconAnchor: [13, 5],
          iconUrl: iconURL
        })
      }).bindTooltip(`<i style="font-weight: bold; font-size: 16px">You've already chosen a Cart</i>`);
    } else { // when user didn't choose a Cart yet, but the Cart is in use of unavailable, then show status
      createdMarker = marker([cart.getLat(), cart.getLng()], {
        icon: icon({
          iconSize: [35, 35],
          iconAnchor: [13, 5],
          iconUrl: iconURL
        })
      }).bindTooltip(`<i style="font-weight: bold; font-size: 16px">Status: ${cart.getEquipmentStatus()}</i>`);
    }

    return createdMarker;
  }

  /**
   * This method will check the status of a Cart and returns the correct Icon for the map
   *
   * @param cartStatus status of the cart
   */
  public getCartIconUrl(cartStatus: string): string {
    let iconURL;
    switch (cartStatus) { // find correct icon for status
      case 'AVAILABLE':
        iconURL = Cart.WAGON_ICONS.AVAILABLE;
        break;
      case 'IN_USE':
        iconURL = Cart.WAGON_ICONS.NOT_AVAILABLE;
        break;
      case 'UNAVAILABLE':
        iconURL = Cart.WAGON_ICONS.MAINTENANCE;
        break;
    }
    return iconURL;
  }

  /**
   * This method will translate the Angular enum and return the SpringBoot enum
   *
   * @param type used type enum in the application
   */
  protected translateAppEquipmentEnumToSpring(type) {
    let translated;
    switch (type) {
      case 'Equipment':
        translated = 'EQUIPMENT';
        break;
      case 'Tires Cart':
        translated = 'TIRECART';
        break;
      case 'Nitrogen Cart':
        translated = 'NITROGENCART';
        break;
      case 'Skydrolwagen':
        translated = 'SKYDROLWAGEN';
        break;
      case 'Brakes Cart':
        translated = 'BRAKES_CART';
        break;
      case 'IDG Cart':
        translated = 'IDG_CART';
        break;
      case 'Skydrol':
        translated = 'SKYDROL_CART';
        break;
      case 'Hyjet5':
        translated = 'HYJET5';
        break;
      case 'Heater, Polar Cart':
        translated = 'HEATER_POLAR_CART';
        break;
      case 'Fuel Cart':
        translated = 'FUEL_CART';
        break;
      case 'Working Lift Platform':
        translated = 'WORKING_LIFT_PLATFORM';
        break;
      case 'Technical stairs':
        translated = 'TECHNICAL_STAIRS';
        break;
      case 'Work Lift':
        translated = 'WORK_LIFT';
        break;
      case 'yjet5 hydraulic fuel cart':
        translated = 'HYJET5_HYDRAULIC_FLUID_CART';
        break;
      case 'Pump Stairs':
        translated = 'PUMP_STAIRS';
        break;
      case 'Pylon Stairs':
        translated = 'PYLON_STAIRS';
        break;
      case 'Brakes Cooler':
        translated = 'BRAKES_COOLER';
        break;
      case 'Cooling Cart':
        translated = 'COOLING_CART';
        break;
      case 'Polar Heater':
        translated = 'POLAR_HEATER';
        break;
      case 'Heater':
        translated = 'HEATER';
        break;
      case 'Air Data Cart':
        translated = 'AIR_DATA_CART';
        break;
      case 'Spill Cart':
        translated = 'SPILL_CART';
        break;
      case 'Hoist Cart':
        translated = 'HOIST_CART';
        break;
      case 'Grease Cart':
        translated = 'GREASE_CART';
        break;
      case 'Cleaning Cart':
        translated = 'CLEANING_CART';
        break;
      case 'Spill Kit Cart':
        translated = 'SPILL_CART';
        break;
    }

    return translated;
  }
}
