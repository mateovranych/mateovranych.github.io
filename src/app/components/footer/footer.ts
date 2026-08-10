import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
<footer class="border-t border-border">
  <div class="max-w-6xl mx-auto px-4 py-8 text-sm text-text-secondary flex flex-wrap gap-4 justify-between items-center">
    <span>© {{year}} Mateo Vranych</span>
    <div class="flex gap-5">
      <a href="https://github.com/mateovranych" target="_blank" rel="noreferrer" class="hover:opacity-80 transition">GitHub</a>
      <a href="https://www.linkedin.com/in/mateovranych/" target="_blank" rel="noreferrer" class="hover:opacity-80 transition">LinkedIn</a>
      <a href="mailto:mvranych@gmail.com" class="hover:opacity-80 transition">mvranych@gmail.com</a>
    </div>
  </div>
</footer>
`,
})
export class Footer {
  year = new Date().getFullYear();
}