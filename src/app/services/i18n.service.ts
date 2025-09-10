import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'fr';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLang = signal<Language>('en');
  
  private translations = {
    en: {
      'app.title': 'Gulf of Guinea Meteo',
      'app.subtitle': 'Weather for West African Golf',
      'search.placeholder': 'Enter city name...',
      'search.button': 'Search',
      'search.location': 'Use Location',
      'search.refresh': 'Auto Refresh',
      'weather.loading': 'Loading weather data...',
      'weather.error': 'Oops! Something went wrong',
      'weather.retry': 'Try Again',
      'weather.feels_like': 'Feels like',
      'weather.humidity': 'Humidity',
      'weather.pressure': 'Pressure',
      'weather.visibility': 'Visibility',
      'weather.wind': 'Wind',
      'forecast.title': '5-Day Forecast',
      'map.title': 'Location Map',
      'map.loading': 'Map will show when location is loaded',
      'tips.title': 'Golf Tips',
      'tips.updated': 'Last updated',
      'condition.excellent': 'Perfect for Golf!',
      'condition.good': 'Good Golf Weather',
      'condition.fair': 'Playable Conditions',
      'condition.poor': 'Not Ideal for Golf'
    },
    fr: {
      'app.title': 'Météo Golfe de Guinée',
      'app.subtitle': 'Météo pour le Golf Ouest-Africain',
      'search.placeholder': 'Entrez le nom de la ville...',
      'search.button': 'Rechercher',
      'search.location': 'Utiliser Position',
      'search.refresh': 'Actualisation Auto',
      'weather.loading': 'Chargement des données météo...',
      'weather.error': 'Oups! Une erreur s\'est produite',
      'weather.retry': 'Réessayer',
      'weather.feels_like': 'Ressenti',
      'weather.humidity': 'Humidité',
      'weather.pressure': 'Pression',
      'weather.visibility': 'Visibilité',
      'weather.wind': 'Vent',
      'forecast.title': 'Prévisions 5 Jours',
      'map.title': 'Carte de Localisation',
      'map.loading': 'La carte s\'affichera quand la position sera chargée',
      'tips.title': 'Conseils Golf',
      'tips.updated': 'Dernière mise à jour',
      'condition.excellent': 'Parfait pour le Golf!',
      'condition.good': 'Bon Temps pour le Golf',
      'condition.fair': 'Conditions Jouables',
      'condition.poor': 'Pas Idéal pour le Golf'
    }
  };

  get language() {
    return this.currentLang();
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    localStorage.setItem('meteogolf-lang', lang);
  }

  translate(key: string): string {
    return (this.translations[this.currentLang()] as any)[key] || key;
  }

  constructor() {
    const saved = localStorage.getItem('meteogolf-lang') as Language;
    if (saved && (saved === 'en' || saved === 'fr')) {
      this.currentLang.set(saved);
    }
  }
}