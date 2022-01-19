import { async, ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * @Author Ali Butt
 */
import { FooterComponent } from './footer.component';
import {By} from "@angular/platform-browser";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let componentHTML: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * should control the content of the span & if it loads
   */
  it('should load span and check content', () => {
    const content  = componentHTML.querySelector('span');
    expect(content.innerText).toContain('Copyright \u00A9 Hogeschool van Amsterdam');
    expect(content).toBeTruthy();
  });

});
