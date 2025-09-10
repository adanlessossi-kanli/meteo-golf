import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../services';
import {
  ForecastComponent,
  GolfTipsComponent
} from '../';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule, ForecastComponent, MapComponent, GolfTipsComponent],
  template: `
    <div class="right-panel">
      @if (weather) {
        <app-forecast
          [forecastData]="forecastData">
        </app-forecast>
        
        <app-map
          [cityName]="weather.name"
          [coordinates]="weather.coord || null">
        </app-map>
        
        <app-golf-tips
          [tip]="golfTip"
          [lastUpdated]="lastUpdated">
        </app-golf-tips>
      }
    </div>
  `,
  styles: [`
    .right-panel {
      padding: 20px;
      overflow-y: auto;
    }
  `]
})
export class RightPanelComponent {
  @Input() weather: WeatherData | null = null;
  @Input() forecastData: any[] = [];
  @Input() golfTip = '';
  @Input() lastUpdated: Date | null = null;
}