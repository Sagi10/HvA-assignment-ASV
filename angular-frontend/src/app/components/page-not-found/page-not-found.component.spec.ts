import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

/**
 * @Author Ali Butt
 */
describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let componentHtml: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * should load and check content of 'h1'
   */
  it('should load and check content of the header', () => {
    const content  = componentHtml.querySelector('h1');
    expect(content.innerText).toContain('Er is een fout opgetreden!');
    expect(content).toBeTruthy();
  });


  /**
   * should load anc check content of 'p'
   */
  it('should load and check content of the paragraph', () => {
    const content  = componentHtml.querySelector('p');
    expect(content.innerText).toContain('Pagina niet gevonden');
    expect(content).toBeTruthy();
  });
});
