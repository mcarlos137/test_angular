import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { InitialComponent } from './initial.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        InitialComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InitialComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'test_angular'`, () => {
    const fixture = TestBed.createComponent(InitialComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('test_angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(InitialComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, test_angular');
  });
});
