import { Component, Input, OnInit, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { I18nService } from '../../services';

declare var L: any;

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div class="map-container">
      <h4>📍 {{ i18n.translate('map.title') }}</h4>
      <div id="map" class="map"></div>
    </div>
  `,
  styles: [`
    .map-container {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    
    .map-container h4 {
      margin: 0 0 16px 0;
      font-size: 1.2em;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .map {
      width: 100%;
      height: 250px;
      border-radius: 12px;
      background: #f8f9fa;
    }
    
    @media (max-width: 768px) {
      .map-container {
        margin: 0 10px 15px 10px;
        padding: 15px;
      }
      
      .map {
        height: 200px;
      }
    }
    
    @media (max-width: 480px) {
      .map-container {
        margin: 0 5px 10px 5px;
        padding: 12px;
      }
      
      .map {
        height: 180px;
      }
    }
  `]
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() cityName = '';
  @Input() coordinates: { lat: number; lon: number } | null = null;
  private map: any;
  private marker: any;

  constructor(public i18n: I18nService) {}

  ngOnInit() {
    this.loadLeaflet();
  }

  ngAfterViewInit() {
    setTimeout(() => this.initMap(), 100);
  }

  ngOnChanges() {
    if (this.coordinates) {
      setTimeout(() => this.initMap(), 100);
    }
  }

  ngOnDestroy() {
    try {
      if (this.marker) {
        this.marker = null;
      }
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
    } catch (error) {
      console.warn('Map cleanup error:', error);
    }
  }

  private loadLeaflet() {
    if (typeof L === 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => this.initMap();
      document.head.appendChild(script);
    }
  }

  private initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    if (typeof L === 'undefined' || !this.coordinates) {
      mapElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 1.1em;">
          🗺️ {{ i18n.translate('map.loading') }}
        </div>
      `;
      return;
    }

    try {
      if (this.map) {
        if (this.marker) {
          this.map.removeLayer(this.marker);
          this.marker = null;
        }
        this.map.setView([this.coordinates.lat, this.coordinates.lon], 10);
      } else {
        this.map = L.map('map').setView([this.coordinates.lat, this.coordinates.lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
      }

      this.marker = L.marker([this.coordinates.lat, this.coordinates.lon])
        .addTo(this.map)
        .bindPopup(`<b>${this.cityName}</b><br>Weather Location`)
        .openPopup();
    } catch (error) {
      console.warn('Map initialization error:', error);
    }
  }
}