import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
<header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/70 border-b border-border">

  <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

    <a href="#home" class="font-semibold tracking-tight z-[60]">
      <span class="text-text-primary">Mateo</span>
      <span class="text-text-secondary">.dev</span>
    </a>

    <nav class="hidden md:flex items-center gap-6 text-sm text-text-secondary">
      <a class="hover:text-text-primary transition-colors" href="#projects">{{ data().ui.nav.projects }}</a>
      <a class="hover:text-text-primary transition-colors" href="#experience">{{ data().ui.nav.experience }}</a>
      <a class="hover:text-text-primary transition-colors" href="#skills">{{ data().ui.nav.skills }}</a>
      <a class="hover:text-text-primary transition-colors" href="#contact">{{ data().ui.nav.contact }}</a>
    </nav>

<div class="hidden md:flex gap-3">
  <a href="#contact" class="btn btn-primary">
    {{ data().ui.nav.cta }}
  </a>

  <a [href]="data().ui.cvPath" [download]="langService.lang() === 'en' ? 'Mateo_CV_EN.pdf' : 'Mateo_CV.pdf'" class="btn btn-secondary">
    {{ data().ui.nav.downloadCv }}
  </a>
</div>



    <button
      (click)="toggleMenu()"
      class="md:hidden z-[60] p-2
      text-text-secondary
      hover:text-text-primary
      focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path *ngIf="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        <path *ngIf="isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

  </div>

  <div
    [ngClass]="{'opacity-100 pointer-events-auto': isMenuOpen, 'opacity-0 pointer-events-none': !isMenuOpen}"
    class="fixed inset-0 h-screen w-screen
    bg-bg
    backdrop-blur-xl
    transition-all duration-500
    md:hidden flex flex-col items-center justify-center z-[55]">

    <div
      [ngClass]="{'translate-y-0 opacity-100': isMenuOpen, 'translate-y-10 opacity-0': !isMenuOpen}"
      class="flex flex-col items-center space-y-8 transition-all duration-700 delay-100">

      <a (click)="toggleMenu()" class="text-3xl font-medium tracking-tight
      text-text-primary hover:opacity-80" href="#home">{{ data().ui.nav.home }}</a>

      <a (click)="toggleMenu()" class="text-3xl font-medium tracking-tight
      text-text-primary hover:opacity-80" href="#projects">{{ data().ui.nav.projects }}</a>

      <a (click)="toggleMenu()" class="text-3xl font-medium tracking-tight
      text-text-primary hover:opacity-80" href="#experience">{{ data().ui.nav.experience }}</a>

      <a (click)="toggleMenu()" class="text-3xl font-medium tracking-tight
      text-text-primary hover:opacity-80" href="#skills">{{ data().ui.nav.skills }}</a>

      <a (click)="toggleMenu()" class="text-3xl font-medium tracking-tight
      text-text-primary hover:opacity-80" href="#contact">{{ data().ui.nav.contact }}</a>

      <a (click)="toggleMenu()" href="#contact"
        class="btn btn-primary mt-4 px-8 py-4 font-bold hover:scale-105 transition-transform">
        {{ data().ui.nav.mobileCta }}
      </a>

      <div>
          <a (click)="toggleMenu()" [href]="data().ui.cvPath" [download]="langService.lang() === 'en' ? 'Mateo_CV_EN.pdf' : 'Mateo_CV.pdf'"
        class="btn btn-secondary mt-4 px-8 py-4 font-bold hover:scale-105 transition-transform">
        {{ data().ui.nav.downloadCv }}
      </a>
      </div>
    </div>
  </div>

</header>

<div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
  <button
    (click)="themeService.toggleTheme()"
    class="btn btn-ghost p-2 rounded-full bg-bg/80 backdrop-blur-md border border-border shadow-lg hover:scale-110 transition-transform">
    {{ themeService.isDark() ? '☀️' : '🌙' }}
  </button>
  <button
    (click)="langService.toggle()"
    class="btn btn-ghost p-2 rounded-full bg-bg/80 backdrop-blur-md border border-border shadow-lg text-xs font-bold hover:scale-110 transition-transform">
    {{ langService.lang() === 'es' ? 'EN' : 'ES' }}
  </button>
</div>
`,
})
export class Navbar {

  themeService = inject(ThemeService);
  langService = inject(LanguageService);
  data = this.langService.data;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
