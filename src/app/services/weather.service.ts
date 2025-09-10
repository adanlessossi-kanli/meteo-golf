import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  name: string;
  coord?: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '47f83a0cb8c471d9828d76836801e876';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<WeatherData> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherData>(url);
  }

  getForecast(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherData>(url);
  }
}
