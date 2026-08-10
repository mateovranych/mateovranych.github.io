import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
<h3 class="section-title">
  {{ data().ui.experience.title }}
</h3>

<p class="section-subtitle">
  {{ data().ui.experience.subtitle }}
</p>

<div class="mt-8 space-y-6">

  <div *ngFor="let e of data().experience" class="relative pl-6">

    <div class="absolute left-0 top-2 h-3 w-3 rounded-full bg-accent"></div>

    <div class="card p-6">

      <div class="flex flex-wrap items-center justify-between gap-2">

        <div>
          <div class="text-sm text-text-secondary">
            {{e.period}} · {{e.location || ''}}
          </div>

          <div class="text-lg font-semibold text-text-primary">
            {{e.role}}
          </div>

          <div class="text-text-secondary">
            {{e.company}}
          </div>
        </div>

      </div>

      <ul class="mt-4 space-y-2 text-sm text-text-secondary">
        <li *ngFor="let b of e.bullets">• {{b}}</li>
      </ul>

      <div class="mt-5 flex flex-wrap gap-2">

        <span *ngFor="let s of e.stack" class="badge">
          {{s}}
        </span>

      </div>

    </div>

  </div>

</div>
`,
})
export class Experience {
  private lang = inject(LanguageService);
  data = this.lang.data;
}
