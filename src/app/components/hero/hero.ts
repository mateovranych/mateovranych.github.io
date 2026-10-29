import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../services/animateOnScrollDirective.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
<div class="grid lg:grid-cols-2 gap-10 items-center py-6 px-8">

  <div>
    <p animateOnScroll class="anim-hidden text-text-secondary text-sm tracking-widest uppercase">
      {{ data().location }}
    </p>

    <h1 animateOnScroll class="anim-hidden mt-3 text-4xl md:text-5xl font-semibold leading-tight text-text-primary" style="--i:1">
      {{ data().name }}
    </h1>

    <h2 animateOnScroll class="anim-hidden mt-3 text-xl md:text-2xl text-text-secondary" style="--i:2">
      {{ data().headline }}
    </h2>

    <p animateOnScroll class="anim-hidden mt-6 leading-relaxed text-text-secondary" style="--i:3">
      {{ data().summary }}
    </p>

    <div animateOnScroll class="anim-hidden mt-8 flex flex-wrap gap-3" style="--i:4">
      <a href="#projects" class="btn btn-primary">{{ data().ui.hero.viewProjects }}</a>
      <a href="#contact" class="btn">{{ data().ui.hero.contact }}</a>
    </div>

    <div animateOnScroll class="anim-hidden mt-6 flex gap-4 text-sm text-text-secondary" style="--i:5">
      <a *ngFor="let l of data().links"
        class="hover:opacity-80 transition"
        [href]="l.href"
        target="_blank"
        rel="noreferrer">
        {{ l.label }}
      </a>
    </div>
  </div>

  <div animateOnScroll class="anim-hidden photo-stage" style="--i:2">
    <div class="photo-frame">
      <img class="photo-img" src="assets/photos/perfil.jpeg" [alt]="data().name" />
    </div>
  </div>
</div>
  `,
  styles: [`
    .anim-hidden {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }

    .anim-visible {
      animation: heroReveal 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
      animation-delay: calc(var(--i, 0) * 110ms);
    }

    @keyframes heroReveal {
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ---------- Profile photo ---------- */
    .photo-stage {
      display: flex;
      justify-content: center;
    }

    /* Base = light theme (Windows 95 beveled frame) */
    .photo-frame {
      position: relative;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 4 / 5;
      overflow: hidden;
      background: var(--surface);
      animation: floaty 6s ease-in-out infinite;
      will-change: transform;
      border-radius: 0;
      border: 3px solid #c0c0c0;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
      border-right-color: #808080;
      border-bottom-color: #808080;
      box-shadow: 0 0 0 1px #000000, 8px 8px 0 rgba(0, 0, 0, 0.3);
    }

    .photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      display: block;
    }

    @keyframes floaty {
      0%, 100% { translate: 0 0; }
      50%      { translate: 0 -9px; }
    }

    /* Dark theme — iOS rounded card */
    :host-context(.dark) .photo-frame {
      border-radius: 22px;
      border: 1px solid #38383a;
      box-shadow: 0 35px 70px -20px rgba(0, 0, 0, 0.75);
    }

    @media (prefers-reduced-motion: reduce) {
      .photo-frame { animation: none; }
    }
  `]
})
export class Hero {
  private lang = inject(LanguageService);
  data = this.lang.data;
}
