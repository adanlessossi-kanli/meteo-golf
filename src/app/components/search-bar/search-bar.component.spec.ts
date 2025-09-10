import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    component.quickLocations = ['Lome, Togo', 'Accra, Ghana'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event', () => {
    spyOn(component.search, 'emit');
    component.city = 'Paris';
    
    component.onSearch();
    
    expect(component.search.emit).toHaveBeenCalledWith('Paris');
  });

  it('should emit location request', () => {
    spyOn(component.locationRequest, 'emit');
    
    component.onLocationRequest();
    
    expect(component.locationRequest.emit).toHaveBeenCalled();
  });

  it('should select location and emit', () => {
    spyOn(component.locationSelect, 'emit');
    
    component.onLocationSelect('Accra, Ghana');
    
    expect(component.city).toBe('Accra, Ghana');
    expect(component.locationSelect.emit).toHaveBeenCalledWith('Accra, Ghana');
  });

  it('should toggle refresh', () => {
    spyOn(component.toggleRefresh, 'emit');
    
    component.onToggleRefresh();
    
    expect(component.toggleRefresh.emit).toHaveBeenCalled();
  });

  it('should display quick locations', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('.location-btn');
    
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Lome, Togo');
  });
});