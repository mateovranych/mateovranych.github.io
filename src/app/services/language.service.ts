import { Injectable, signal, computed, effect } from '@angular/core';
import { PORTFOLIO_ES, PORTFOLIO_EN } from '../portfolio.data';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  lang = signal<'es' | 'en'>((localStorage.getItem('lang') as 'es' | 'en') || 'es');

  data = computed(() => this.lang() === 'en' ? PORTFOLIO_EN : PORTFOLIO_ES);

  constructor() {
    effect(() => localStorage.setItem('lang', this.lang()));
  }

  toggle() {
    this.lang.update(v => v === 'es' ? 'en' : 'es');
  }
}
