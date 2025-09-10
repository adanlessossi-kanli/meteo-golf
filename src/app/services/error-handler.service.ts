import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Network error - check your connection';
    }
    
    switch (error.status) {
      case 401:
        return 'Invalid API key';
      case 404:
        return 'City not found';
      case 429:
        return 'Too many requests - try again later';
      case 500:
        return 'Weather service unavailable';
      default:
        return 'Weather data unavailable';
    }
  }
}