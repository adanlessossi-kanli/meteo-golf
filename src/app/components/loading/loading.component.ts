import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="loading-container">
      <div class="spinner"></div>
      <p>Loading weather data...</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      background: rgba(255,255,255,0.95);
      border-radius: 20px;
      margin: 20px;
      backdrop-filter: blur(10px);
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #4CAF50;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    p {
      margin-top: 16px;
      color: #2c3e50;
      font-weight: 500;
    }
  `]
})
export class LoadingComponent {}