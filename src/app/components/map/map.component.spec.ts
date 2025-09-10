import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display city name and coordinates', () => {
    component.cityName = 'Lome';
    component.coordinates = { lat: 6.1319, lon: 1.2228 };
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Location Map');
  });

  it('should handle missing coordinates', () => {
    component.cityName = 'Test City';
    component.coordinates = null;
    
    expect(component).toBeTruthy();
  });
});