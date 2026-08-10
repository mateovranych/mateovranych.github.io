import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-demo-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-header" [class.dark-header]="theme.isDark()">
      <button class="back-btn" (click)="goBack()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Volver al portfolio
      </button>
      <div class="demo-badge">
        <span class="badge-dot"></span>
        Demo interactiva · {{ title }}
      </div>
    </div>
  `,
  styles: [`
    .demo-header {
      --hdr-surface: #c0c0c0;
      --hdr-text: #000000;
      --hdr-text-2: #131212;
      --hdr-light: #ffffff;
      --hdr-dark: #808080;

      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      background: var(--hdr-surface);
      border-bottom: 2px solid;
      border-color: var(--hdr-light) var(--hdr-dark) var(--hdr-dark) var(--hdr-light);
      color: var(--hdr-text);
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--hdr-surface);
      color: var(--hdr-text);
      border: 2px solid;
      border-color: var(--hdr-light) var(--hdr-dark) var(--hdr-dark) var(--hdr-light);
      padding: 4px 12px;
      cursor: pointer;
      font-family: inherit;
      font-size: 13px;
    }

    .back-btn:hover { filter: brightness(0.95); }
    .back-btn:active {
      border-color: var(--hdr-dark) var(--hdr-light) var(--hdr-light) var(--hdr-dark);
    }

    .dark-header {
      --hdr-surface: #1c1c1e;
      --hdr-text: #ffffff;
      --hdr-text-2: #8e8e93;
      --hdr-light: #38383a;
      --hdr-dark: #38383a;
      border-radius: 0;
    }

    .dark-header .back-btn {
      border-radius: 8px;
    }

    .demo-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--hdr-text-2);
    }

    .badge-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #22c55e;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `]
})
export class DemoHeaderComponent {
  @Input() title = '';

  constructor(public theme: ThemeService, private router: Router) {}

  goBack() { this.router.navigate(['/']); }
}