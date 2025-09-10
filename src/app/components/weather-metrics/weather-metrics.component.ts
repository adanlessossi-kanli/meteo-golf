import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../services';

@Component({
  selector: 'app-weather-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-metrics.component.html',
  styleUrl: './weather-metrics.component.css'
})
export class WeatherMetricsComponent {
  @Input() weather: WeatherData | null = null;
  @Input() windDirection = '';
}