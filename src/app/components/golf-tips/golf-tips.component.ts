import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-golf-tips',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (tip) {
      <div class="golf-tips">
        <h4>Golf Tips</h4>
        <div class="tip">{{ tip }}</div>
      </div>
    }
    
    @if (lastUpdated) {
      <div class="last-updated">
        Last updated: {{ lastUpdated | date:'short' }}
      </div>
    }
  `,
  styles: [`
    .golf-tips {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border-left: 4px solid #4CAF50;
    }
    
    .golf-tips h4 {
      margin: 0 0 12px 0;
      color: #2c3e50;
      font-size: 1.1em;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .golf-tips h4::before {
      content: '⛳';
      font-size: 1.2em;
    }
    
    .tip {
      font-size: 0.95em;
      color: #555;
      line-height: 1.5;
      font-weight: 500;
    }
    
    .last-updated {
      text-align: center;
      font-size: 0.8em;
      color: rgba(255,255,255,0.8);
      margin: 0 20px 20px 20px;
      padding: 12px;
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
  `]
})
export class GolfTipsComponent {
  @Input() tip = '';
  @Input() lastUpdated: Date | null = null;
}