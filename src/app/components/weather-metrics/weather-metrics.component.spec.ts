import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherMetricsComponent } from './weather-metrics.component';

describe('WeatherMetricsComponent', () => {
  let component: WeatherMetricsComponent;
  let fixture: ComponentFixture<WeatherMetricsComponent>;

  const mockWeather = {
    name: 'Lome',
    main: { temp: 25, feels_like: 27, humidity: 80, pressure: 1013 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 3, deg: 180 },
    visibility: 10000,
    sys: { sunrise: 1234567890, sunset: 1234567890 }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherMetricsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherMetricsComponent);
    component = fixture.componentInstance;
    component.weather = mockWeather;
    component.windDirection = 'S';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather metrics', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.metric-value').textContent).toContain('3 m/s');
  });
});