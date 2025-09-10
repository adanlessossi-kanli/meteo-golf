import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather by city', () => {
    const mockWeather = {
      name: 'Lome',
      main: { temp: 25, feels_like: 27, humidity: 80, pressure: 1013 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 3, deg: 180 },
      visibility: 10000,
      sys: { sunrise: 1234567890, sunset: 1234567890 }
    };

    service.getWeatherByCity('Lome').subscribe(weather => {
      expect(weather).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(req => req.url.includes('weather?q=Lome'));
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
  });

  it('should fetch forecast', () => {
    const mockForecast = { list: [] };

    service.getForecast('Lome').subscribe(forecast => {
      expect(forecast).toEqual(mockForecast);
    });

    const req = httpMock.expectOne(req => req.url.includes('forecast?q=Lome'));
    expect(req.request.method).toBe('GET');
    req.flush(mockForecast);
  });

  it('should fetch weather by coordinates', () => {
    const mockWeather = {
      name: 'Lome',
      main: { temp: 25, feels_like: 27, humidity: 80, pressure: 1013 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 3, deg: 180 },
      visibility: 10000,
      sys: { sunrise: 1234567890, sunset: 1234567890 }
    };

    service.getWeatherByCoords(6.1319, 1.2228).subscribe(weather => {
      expect(weather).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(req => req.url.includes('lat=6.1319&lon=1.2228'));
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
  });
});