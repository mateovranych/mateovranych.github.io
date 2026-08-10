import { Injectable, signal, effect } from '@angular/core';

function resolveInitialTheme(): boolean {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(resolveInitialTheme());

  constructor() {    
    effect(() => {
      const theme = this.isDark() ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      
      if (this.isDark()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    this.isDark.update(v => !v);
  }
}