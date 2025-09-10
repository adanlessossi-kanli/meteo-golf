import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (forecastData && forecastData.length > 0) {
      <div class="forecast-section">
        <h4>5-Day Outlook</h4>
        <div class="forecast-grid">
          @for (day of forecastData; track day.date) {
            <div class="forecast-day">
              <div class="day-name">{{ day.date | date:'EEE' }}</div>
              <img [src]="'https://openweathermap.org/img/wn/' + day.icon + '.png'" class="forecast-icon">
              <div class="forecast-temp">{{ day.temp }}°</div>
              <div class="forecast-condition" [ngClass]="day.golfCondition">{{ day.golfText }}</div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .forecast-section {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    
    .forecast-section h4 {
      margin: 0 0 16px 0;
      font-size: 1.2em;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    
    .forecast-day {
      text-align: center;
      padding: 12px 8px;
      background: rgba(248,249,250,0.8);
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    
    .forecast-day:hover {
      background: rgba(255,255,255,1);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .day-name {
      font-weight: bold;
      font-size: 0.8em;
    }
    
    .forecast-icon {
      width: 40px;
      height: 40px;
    }
    
    .forecast-temp {
      font-weight: bold;
      margin: 5px 0;
    }
    
    .forecast-condition {
      font-size: 0.7em;
      padding: 2px 4px;
      border-radius: 10px;
      color: white;
    }
    
    .excellent { background: linear-gradient(135deg, #4CAF50, #45a049); }
    .good { background: linear-gradient(135deg, #8BC34A, #7CB342); }
    .fair { background: linear-gradient(135deg, #FF9800, #F57C00); }
    .poor { background: linear-gradient(135deg, #f44336, #d32f2f); }
  `]
})
export class ForecastComponent {
  @Input() forecastData: any[] = [];
}