import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

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
      imports: [CurrentWeatherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    component.weather = mockWeather;
    component.golfCondition = 'excellent';
    component.golfConditionText = 'Perfect for Golf!';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather data', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Lome');
    expect(compiled.querySelector('.temp').textContent).toContain('25°');
    expect(compiled.querySelector('.description').textContent).toContain('clear sky');
  });

  it('should display golf condition', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.condition-badge').textContent).toContain('Perfect for Golf!');
  });

  it('should display feels like temperature', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.feels-like').textContent).toContain('Feels like 27°C');
  });

  it('should display weather icon', () => {
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('.weather-icon');
    expect(img.src).toContain('01d@2x.png');
  });
});