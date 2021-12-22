import { async, ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * @Author Ali Butt
 */
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let componentHtml: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * testing if the logo loads correctly
   */
  it('should load logo', () => {
    componentHtml.querySelectorAll('png').forEach(
      (img: HTMLImageElement) => {
        expect(img).toBeTruthy();
        expect(img.complete).toBeTruthy();
      });
  });



});
