import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'meteogolf-preferences';

  savePreferences(data: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getPreferences(): any {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  saveLastCity(city: string): void {
    const prefs = this.getPreferences();
    prefs.lastCity = city;
    this.savePreferences(prefs);
  }

  getLastCity(): string {
    return this.getPreferences().lastCity || 'Lome, Togo';
  }
}