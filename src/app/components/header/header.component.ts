import { Component } from '@angular/core';
import { I18nService, Language } from '../../services';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public i18n: I18nService) {}

  setLanguage(lang: Language) {
    this.i18n.setLanguage(lang);
  }
}