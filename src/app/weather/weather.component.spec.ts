import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services';
import { of, throwError } from 'rxjs';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;

  const mockWeatherData = {
    name: 'Lome',
    main: { temp: 25, feels_like: 27, humidity: 80, pressure: 1013 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 3, deg: 180 },
    visibility: 10000,
    sys: { sunrise: 1234567890, sunset: 1234567890 }
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WeatherService', ['getWeatherByCity', 'getForecast', 'getWeatherByCoords']);
    spy.getWeatherByCity.and.returnValue(of(mockWeatherData));
    spy.getForecast.and.returnValue(of({ list: [] }));

    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [{ provide: WeatherService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    
    // Prevent automatic getWeather call in constructor
    spyOn(component, 'getWeather');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather data on init', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    weatherService.getWeatherByCity.and.returnValue(of(mockWeatherData));
    weatherService.getForecast.and.returnValue(of({ list: [] }));
    
    component.getWeather();
    
    expect(weatherService.getWeatherByCity).toHaveBeenCalledWith('Lome, Togo');
    expect(component.weather()).toEqual(mockWeatherData);
  });

  it('should handle weather service error', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    weatherService.getWeatherByCity.and.returnValue(throwError(() => new Error('API Error')));
    
    component.getWeather();
    
    expect(component.error()).toBe('City not found or API error');
    expect(component.weather()).toBeNull();
  });

  it('should calculate golf condition correctly', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    component.weather.set(mockWeatherData);
    
    const condition = component.getGolfCondition();
    
    expect(condition).toBe('excellent');
  });

  it('should get wind direction', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    component.weather.set(mockWeatherData);
    
    const direction = component.getWindDirection();
    
    expect(direction).toBe('S');
  });

  it('should get daily forecast', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    const mockForecast = {
      list: Array(40).fill({
        dt: 1234567890,
        main: { temp: 25 },
        weather: [{ icon: '01d', main: 'Clear' }],
        wind: { speed: 3 }
      })
    };
    component.forecast.set(mockForecast);
    
    const daily = component.getDailyForecast();
    
    expect(daily.length).toBe(5);
    expect(daily[0].temp).toBe(25);
  });

  it('should handle geolocation', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    const mockGeolocation = {
      getCurrentPosition: jasmine.createSpy().and.callFake((success) => {
        success({ coords: { latitude: 6.1319, longitude: 1.2228 } });
      })
    };
    Object.defineProperty(window.navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true
    });
    
    weatherService.getWeatherByCoords.and.returnValue(of(mockWeatherData));
    weatherService.getForecast.and.returnValue(of({ list: [] }));
    
    component.getCurrentLocation();
    
    expect(weatherService.getWeatherByCoords).toHaveBeenCalledWith(6.1319, 1.2228);
  });

  it('should toggle auto refresh', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    expect(component.autoRefresh()).toBeFalse();
    
    component.toggleAutoRefresh();
    
    expect(component.autoRefresh()).toBeTrue();
  });

  it('should provide golf tips', () => {
    (component.getWeather as jasmine.Spy).and.callThrough();
    component.weather.set(mockWeatherData);
    
    const tip = component.getGolfTip();
    
    expect(tip).toBe('Great conditions - enjoy your round!');
  });
});