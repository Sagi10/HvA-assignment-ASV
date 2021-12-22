import {TestBed} from '@angular/core/testing';

import {RequestService} from './request.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../authentication/authentication.service';
import {Request} from "../../models/request/request";
import {PlaneTypes} from "../../models/enums/planeTypes";
import {TailType} from "../../models/enums/tailTypeEnums/TailTypes";
import {WagonTypes} from "../../models/enums/wagonTypes";
import {RequestStatus} from "../../models/enums/requestStatus";


/**
 * @Author: Sagi Lalee
 */
describe('RequestService', () => {
  let request: Request = new Request(1, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
    WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
    1001, null, null, new Date());
  let request1 = new Request(2, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
    WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
    1001, null, null, new Date());
  let request2 = new Request(3, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
    WagonTypes.TIRECART, 0, 'Right', RequestStatus.Accepted, null,
    1001, null, null, new Date());

  beforeEach(() => TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthenticationService]
    }));

  it('should be created', () => {
    const service: RequestService = TestBed.get(RequestService);
    expect(service).toBeTruthy();
  });

  /**
   * selected wagon should be changed to 35
   */
  it('changes selectedwagon to randomID', () => {
    const service: RequestService = TestBed.get(RequestService);

    service.meldingen.push(request);
    service.selectedwagonchange(1);
    expect(35).toBe(service.meldingen[0].selectedWagon);
  });

  /**
   * adds 3 requests to the  meldingenservice.mechanicmeldingen
   * the length should be equal to the request that is added in the array
   */
  it('adds 3 request to the mechanic request array', () => {
    const service: RequestService = TestBed.get(RequestService);

    service.mechanicMeldingen.push(request);
    service.mechanicMeldingen.push(request1);
    service.mechanicMeldingen.push(request2);
    expect(3).toBe(service.getMechanicMeldingen().length);
  });

  it('gets request by id', () => {
    const service: RequestService = TestBed.get(RequestService);

    service.meldingen.push(request);
    expect(request).toBe(service.getRequesetById(1));
  });

  /**
   * length should be 0 by default.
   */
  it('check mechanic meldingen length', () => {
    const service: RequestService = TestBed.get(RequestService);
    expect(0).toBe(service.getMechanicMeldingen().length);
  });

  /**
   * lenght should be 0 by default.
   */
  it('check "alle meldingen" length', () => {
    const service: RequestService = TestBed.get(RequestService);
    expect(0).toBe(service.getAlleMeldingen.length);
  });

  /**
   * changes the status to Accepted
   */
  it('changes request status to Accepted', () => {
    const service: RequestService = TestBed.get(RequestService);

    service.meldingen.push(request);
    service.meldingen.push(request1);
    service.AcceptstatusRequest(2);
    expect('Accepted').toBe(service.meldingen[1].status);
  });

  /**
   * changes the status to Delivered
   */
  it('changes meldingstatus to Delivered', () => {
    const service: RequestService = TestBed.get(RequestService);

    service.meldingen.push(request);
    service.deliverstatusRequest(1);
    expect('Delivered').toBe(service.meldingen[0].status);
  });

  /**
   * changes the status to Finished
   */
  it('changes meldingstatus to Finished', () => {
    const service: RequestService = TestBed.get(RequestService);

    service.meldingen.push(request);
    service.finishedstatusRequest(1);
    expect('Finished').toBe(service.meldingen[0].status);
  });

});
