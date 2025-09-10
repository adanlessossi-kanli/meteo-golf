import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  const mockForecastData = [
    {
      date: new Date(),
      temp: 25,
      icon: '01d',
      golfCondition: 'excellent',
      golfText: 'Perfect'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    component.forecastData = mockForecastData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display forecast data', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.forecast-temp').textContent).toContain('25°');
  });
});