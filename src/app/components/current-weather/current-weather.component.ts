import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../services';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent {
  @Input() weather: WeatherData | null = null;
  @Input() golfCondition = '';
  @Input() golfConditionText = '';
}