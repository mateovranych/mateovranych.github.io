import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-apuntes',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
  <div>
    <h3 class="section-title">
      {{ data().ui.apuntes.title }}
    </h3>
    <p class="section-subtitle">
      {{ data().ui.apuntes.subtitle }}
    </p>
  </div>

  <a [href]="repo" target="_blank" rel="noopener" class="btn btn-secondary whitespace-nowrap self-start md:self-auto">
    {{ data().ui.apuntes.viewAll }}
  </a>
</div>

<div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

  <a *ngFor="let a of data().apuntes" [href]="a.pdf" target="_blank" rel="noopener"
     class="card p-6 flex flex-col group hover:-translate-y-1 transition-transform">

    <h4 class="font-semibold text-text-primary group-hover:opacity-80">
      {{ a.title }}
    </h4>

    <p class="mt-2 text-sm text-text-secondary flex-1">
      {{ a.topic }}
    </p>

    <div class="mt-4 flex flex-wrap gap-2">
      <span *ngFor="let s of a.stack" class="badge">
        {{ s }}
      </span>
    </div>

    <span class="mt-4 text-sm font-medium text-text-primary inline-flex items-center gap-1">
      {{ data().ui.apuntes.open }}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </span>

  </a>

</div>
`,
})
export class Apuntes {
  private lang = inject(LanguageService);
  data = this.lang.data;
  repo = 'https://github.com/mateovranych/APUNTES';
}
