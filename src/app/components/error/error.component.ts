import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  template: `
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{{ message }}</p>
      <button (click)="onRetry()" class="retry-btn">Try Again</button>
    </div>
  `,
  styles: [`
    .error-container {
      text-align: center;
      padding: 40px 20px;
      background: rgba(255,255,255,0.95);
      border-radius: 20px;
      margin: 20px;
      backdrop-filter: blur(10px);
      border-left: 4px solid #f44336;
    }
    
    .error-icon {
      font-size: 3em;
      margin-bottom: 16px;
    }
    
    h3 {
      color: #d32f2f;
      margin: 0 0 12px 0;
      font-size: 1.2em;
    }
    
    p {
      color: #666;
      margin-bottom: 20px;
    }
    
    .retry-btn {
      background: linear-gradient(135deg, #f44336, #d32f2f);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 500;
      transition: transform 0.2s;
    }
    
    .retry-btn:hover {
      transform: translateY(-2px);
    }
  `]
})
export class ErrorComponent {
  @Input() message = 'An error occurred';
  @Output() retry = new EventEmitter<void>();
  
  onRetry() {
    this.retry.emit();
  }
}