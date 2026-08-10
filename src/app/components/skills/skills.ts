import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
<h3 class="section-title">
  {{ data().ui.skills.title }}
</h3>

<p class="section-subtitle">
  {{ data().ui.skills.subtitle }}
</p>

<div class="mt-8 grid md:grid-cols-2 gap-6">

  <div *ngFor="let g of data().skills" class="card p-6">

    <h4 class="font-semibold text-text-primary">
      {{g.title}}
    </h4>

    <div class="mt-4 flex flex-wrap gap-2">

      <span *ngFor="let it of g.items" class="badge">
        {{it}}
      </span>

    </div>

  </div>

</div>
`,
})
export class Skills {
  private lang = inject(LanguageService);
  data = this.lang.data;
}
