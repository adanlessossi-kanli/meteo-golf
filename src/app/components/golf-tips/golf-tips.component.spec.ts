import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GolfTipsComponent } from './golf-tips.component';

describe('GolfTipsComponent', () => {
  let component: GolfTipsComponent;
  let fixture: ComponentFixture<GolfTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GolfTipsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GolfTipsComponent);
    component = fixture.componentInstance;
    component.tip = 'Great conditions - enjoy your round!';
    component.lastUpdated = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display golf tip', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.tip').textContent).toContain('Great conditions');
  });

  it('should display last updated time', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.last-updated')).toBeTruthy();
  });
});