import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MechanicpageComponent} from "../mechanicpage/mechanicpage.component";
import {Router} from "@angular/router";
import {Component} from "@angular/core";

/**
 * Made by: Sander van de Kamp
 */
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: 'mechanic', component: Component},
        {path: 'mechanic/open-requests', component: Component},
        {path: 'signin', component: Component}])],
      declarations: [ NavBarComponent, MechanicpageComponent ],
      providers: [Location]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    router = TestBed.get(Router);

    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain two items in the navbar', fakeAsync(() => {
    router.navigate(["mechanic/open-requests"]);
    tick();
    fixture.detectChanges();
    expect(compiled.getElementsByClassName('breadcrumb-item').length).toEqual(2);
  }));

  it('should contain only a single item in the navbar', fakeAsync(() => {
    router.navigate(["mechanic"]);
    tick();
    fixture.detectChanges();
    expect(compiled.getElementsByClassName('breadcrumb-item').length).toEqual(1);
  }));

  it('Shouldn\'t contain any items when on the signin page', fakeAsync(() => {
    router.navigate(["signin"]);
    tick();
    fixture.detectChanges();

    expect(compiled.getElementsByClassName('breadcrumb-item').length).toEqual(0);
  }));

  it('should have 1 anchor and 1 text item as navbar', fakeAsync( () => {

    router.navigate(['mechanic/open-requests']);
    tick();
    fixture.detectChanges();

    expect(compiled.getElementsByClassName('breadcrumb-item')[0].childNodes[1].innerHTML).toEqual('Mechanic');
    expect(compiled.getElementsByClassName('breadcrumb-item')[1].childNodes[1].innerHTML).toEqual("Open-requests");
  }))

});
