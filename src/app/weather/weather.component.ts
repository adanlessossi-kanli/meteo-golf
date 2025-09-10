import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherData, StorageService } from '../services';
import { LeftPanelComponent } from '../components/left-panel/left-panel.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, LeftPanelComponent, RightPanelComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  city = 'Lome, Togo';
  weather = signal<WeatherData | null>(null);
  forecast = signal<any>(null);
  loading = signal(false);
  error = signal('');
  autoRefresh = signal(false);
  lastUpdated = signal(new Date());
  private refreshInterval: any;

  quickLocations = ['Lome, Togo', 'Accra, Ghana', 'Lagos, Nigeria', 'Abidjan, Ivory Coast'];

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {
    this.city = this.storageService.getLastCity();
    this.getWeather();
  }

  getWeather() {
    if (!this.city.trim()) return;

    this.loading.set(true);
    this.error.set('');

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weather.set(data);
        this.lastUpdated.set(new Date());
        this.loading.set(false);
        this.getForecastData();
      },
      error: (err) => {
        this.error.set('City not found or API error');
        this.loading.set(false);
        this.weather.set(null);
      }
    });
  }

  getForecastData() {
    this.weatherService.getForecast(this.city).subscribe({
      next: (data) => this.forecast.set(data),
      error: () => {}
    });
  }

  getGolfCondition(): string {
    const w = this.weather();
    if (!w) return 'fair';

    const temp = w.main.temp;
    const wind = w.wind.speed;
    const weather = w.weather[0].main.toLowerCase();

    if (weather.includes('rain') || weather.includes('storm')) return 'poor';
    if (temp < 10 || temp > 35 || wind > 10) return 'fair';
    if (temp >= 18 && temp <= 25 && wind < 5) return 'excellent';
    return 'good';
  }

  getGolfConditionText(): string {
    const conditions = {
      excellent: 'Perfect for Golf!',
      good: 'Good Golf Weather',
      fair: 'Playable Conditions',
      poor: 'Not Ideal for Golf'
    };
    return conditions[this.getGolfCondition() as keyof typeof conditions];
  }

  onSearch(searchCity: string) {
    this.city = searchCity;
    this.storageService.saveLastCity(searchCity);
    this.getWeather();
  }

  selectLocation(location: string) {
    this.city = location;
    this.storageService.saveLastCity(location);
    this.getWeather();
  }

  getWindDirection(): string {
    const w = this.weather();
    if (!w?.wind?.deg) return '';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(w.wind.deg / 45) % 8];
  }

  getGolfTip(): string {
    const w = this.weather();
    if (!w) return '';

    const wind = w.wind.speed;
    const temp = w.main.temp;
    const humidity = w.main.humidity;

    if (wind > 8) return 'Strong winds - consider club up and aim into the wind';
    if (temp > 30) return 'Hot weather - stay hydrated and take breaks in shade';
    if (humidity > 80) return 'High humidity - ball may not travel as far';
    if (temp < 15) return 'Cool weather - ball travels less, consider extra club';
    return 'Great conditions - enjoy your round!';
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      this.loading.set(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.weatherService.getWeatherByCoords(lat, lon).subscribe({
            next: (data) => {
              this.city = data.name;
              this.weather.set(data);
              this.lastUpdated.set(new Date());
              this.loading.set(false);
              this.getForecastData();
            },
            error: () => {
              this.error.set('Location access failed');
              this.loading.set(false);
            }
          });
        },
        () => {
          this.error.set('Geolocation not supported');
          this.loading.set(false);
        }
      );
    }
  }

  toggleAutoRefresh() {
    this.autoRefresh.set(!this.autoRefresh());
    if (this.autoRefresh()) {
      this.refreshInterval = setInterval(() => this.getWeather(), 300000); // 5 minutes
    } else {
      clearInterval(this.refreshInterval);
    }
  }

  getDailyForecast() {
    const f = this.forecast();
    if (!f) return [];

    const daily = f.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5);
    return daily.map((item: any) => ({
      date: new Date(item.dt * 1000),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      golfCondition: this.getConditionClass(item.main.temp, item.wind.speed, item.weather[0].main),
      golfText: this.getConditionText(item.main.temp, item.wind.speed, item.weather[0].main)
    }));
  }

  private getConditionClass(temp: number, wind: number, weather: string): string {
    if (weather.toLowerCase().includes('rain')) return 'poor';
    if (temp < 10 || temp > 35 || wind > 10) return 'fair';
    if (temp >= 18 && temp <= 25 && wind < 5) return 'excellent';
    return 'good';
  }

  private getConditionText(temp: number, wind: number, weather: string): string {
    const condition = this.getConditionClass(temp, wind, weather);
    const texts = { excellent: 'Perfect', good: 'Good', fair: 'OK', poor: 'Poor' };
    return texts[condition as keyof typeof texts];
  }
}
