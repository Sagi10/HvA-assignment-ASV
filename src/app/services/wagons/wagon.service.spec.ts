import {TestBed} from '@angular/core/testing';

import {WagonsService} from './wagons.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Cart} from '../../models/carts/Cart.model';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {EquipmentStatus} from '../../models/enums/equipmentStatus';
import {RequestService} from '../request/request.service';

describe('WagonService', () => {
  const cartTest = new Cart(1, 'This is a test', 500, 500, WagonTypes.NITROGENCART, EquipmentStatus.AVAILABLE);

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [],
        providers: [RequestService, WagonsService]
      }).compileComponents();
    }
  );

  it('should create a Cart', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.createCart(cartTest)).toBeTruthy();
  });

  it('should create layer of CartMarkers', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.getLayer('SkydrolWagen')).toBeTruthy();
  });

  it('should return all Carts', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.getAllCarts()).toBeTruthy();
  });

  it('should return cart by given id', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.getCartByID(50).subscribe((cart: Cart) => {
      return cart;
    })).toBeTruthy();
  });

  it('shouldn\'t return cart by given id', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.getCartByID(500).subscribe((cart: Cart) => {
      return cart;
    }).unsubscribe()).toBeUndefined();
  });

  it('should give correct iconURL', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.getCartIconUrl('AVAILABLE')).toBeTruthy();
  });

  it('should return empty container of markers for the map', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    const markersArray = service.getMarkers().NITROGENCART;
    expect(markersArray.length).toBeGreaterThanOrEqual(0);
  });

  it('should return Carts of given type', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    service.getCartsByType('Nitrogen Cart').subscribe((carts) => {
      expect(carts).toBeGreaterThan(0);
    }).unsubscribe();

  });

  it('shouldn\'t return Carts of given type', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    let result;
    service.getCartsByType('undefined').subscribe((carts: Cart[]) => {
      result = carts;
    }).unsubscribe();
    expect(result).toBeUndefined();
  });

  it('should give correct iconURL', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.getCartIconUrl('IN_USE')).toBeTruthy();
  });


});
