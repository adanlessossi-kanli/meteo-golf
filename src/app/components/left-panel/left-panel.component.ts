import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../services';
import {
  HeaderComponent,
  SearchBarComponent,
  CurrentWeatherComponent,
  WeatherMetricsComponent
} from '../';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchBarComponent, CurrentWeatherComponent, WeatherMetricsComponent, LoadingComponent, ErrorComponent],
  template: `
    <div class="left-panel">
      <app-header></app-header>
      
      <app-search-bar
        [city]="city"
        [autoRefresh]="autoRefresh"
        [quickLocations]="quickLocations"
        (search)="onSearch($event)"
        (locationRequest)="onLocationRequest()"
        (toggleRefresh)="onToggleRefresh()"
        (locationSelect)="onLocationSelect($event)">
      </app-search-bar>

      @if (loading) {
        <app-loading></app-loading>
      }

      @if (error) {
        <app-error [message]="error" (retry)="onRetry()"></app-error>
      }

      @if (weather) {
        <app-current-weather
          [weather]="weather"
          [golfCondition]="golfCondition"
          [golfConditionText]="golfConditionText">
        </app-current-weather>
        
        <app-weather-metrics
          [weather]="weather"
          [windDirection]="windDirection">
        </app-weather-metrics>
      }
    </div>
  `,
  styles: [`
    .left-panel {
      padding: 0;
      overflow-y: auto;
      background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
      backdrop-filter: blur(20px);
      border-radius: 0 20px 20px 0;
      box-shadow: 4px 0 20px rgba(0,0,0,0.1);
      border-right: 1px solid rgba(255,255,255,0.3);
    }
  `]
})
export class LeftPanelComponent {
  @Input() city = '';
  @Input() autoRefresh = false;
  @Input() quickLocations: string[] = [];
  @Input() loading = false;
  @Input() error = '';
  @Input() weather: WeatherData | null = null;
  @Input() golfCondition = '';
  @Input() golfConditionText = '';
  @Input() windDirection = '';

  @Output() search = new EventEmitter<string>();
  @Output() locationRequest = new EventEmitter<void>();
  @Output() toggleRefresh = new EventEmitter<void>();
  @Output() locationSelect = new EventEmitter<string>();
  @Output() retry = new EventEmitter<void>();

  onSearch(city: string) {
    this.search.emit(city);
  }

  onLocationRequest() {
    this.locationRequest.emit();
  }

  onToggleRefresh() {
    this.toggleRefresh.emit();
  }

  onLocationSelect(location: string) {
    this.locationSelect.emit(location);
  }

  onRetry() {
    this.retry.emit();
  }
}