import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'

})
export class SearchBarComponent {
  @Input() city = '';
  @Input() autoRefresh = false;
  @Input() quickLocations: string[] = [];
  
  @Output() search = new EventEmitter<string>();
  @Output() locationRequest = new EventEmitter<void>();
  @Output() toggleRefresh = new EventEmitter<void>();
  @Output() locationSelect = new EventEmitter<string>();

  constructor(public i18n: I18nService) {}

  onSearch() {
    this.search.emit(this.city);
  }

  onLocationRequest() {
    this.locationRequest.emit();
  }

  onToggleRefresh() {
    this.toggleRefresh.emit();
  }

  onLocationSelect(location: string) {
    this.city = location;
    this.locationSelect.emit(location);
  }
}