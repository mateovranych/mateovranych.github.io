import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/Portfolio.modes';
import { Router } from '@angular/router';
import { AnimateOnScrollDirective } from '../../services/animateOnScrollDirective.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
  <div class="flex items-end justify-between gap-6 anim-hidden" animateOnScroll>
    <div>
      <h3 class="section-title">{{ data().ui.projects.title }}</h3>
      <p class="section-subtitle">
        {{ data().ui.projects.subtitle }}
      </p>
    </div>
  </div>

  <div class="mt-8 grid md:grid-cols-2 gap-6">
    <article
      *ngFor="let p of data().projects; let i = index"
      animateOnScroll
      class="card p-6 anim-hidden"
      [style.--i]="i">

      <h4 class="text-lg font-semibold text-text-primary">
        {{ p.title }}
      </h4>

      <p class="mt-2 text-text-secondary">
        {{ p.description }}
      </p>

      <div *ngIf="p.images?.length" class="mt-4 project-img">
        <img [src]="p.images[0]" [alt]="p.title" loading="lazy">
      </div>

      <div class="mt-5">
        <button class="btn btn-primary" (click)="open(p)">
          {{ data().ui.projects.view }}
        </button>
      </div>

    </article>
  </div>

  <div *ngIf="selected" class="overlay" (click)="close()">
    <div class="modal card p-6" (click)="$event.stopPropagation()">

      <div class="flex items-start justify-between gap-4">
        <div>
          <h4 class="text-xl font-semibold text-text-primary">
            {{ selected.title }}
          </h4>
          <p class="mt-2 text-text-secondary">
            {{ selected.summary || selected.description }}
          </p>
        </div>
        <button class="btn" (click)="close()">X</button>
      </div>

      <div *ngIf="selected.images?.length" class="carousel mt-6">
        <button *ngIf="selected.images.length > 1" class="nav prev" (click)="prevImage()">‹</button>
        <img
  [src]="selected.images[currentImageIndex]"
  [alt]="selected.title"
  (click)="openFullscreen(selected.images[currentImageIndex])"
  class="cursor-pointer carousel-img"
/>
        <button *ngIf="selected.images.length > 1" class="nav next" (click)="nextImage()">›</button>
      </div>

      <div *ngIf="selected.images.length > 1" class="dots mt-3">
        <span
          *ngFor="let img of selected.images; let i = index"
          (click)="currentImageIndex = i"
          [class.active]="i === currentImageIndex">
        </span>
      </div>

      <div class="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <h5 class="text-sm font-bold text-text-primary">{{ data().ui.projects.whatIDid }}</h5>
          <ul class="mt-3 space-y-2 text-sm text-text-secondary">
            <li *ngFor="let h of selected.highlights">• {{ h }}</li>
          </ul>
        </div>
        <div *ngIf="selected.challenges?.length">
          <h5 class="text-sm font-bold text-text-primary">{{ data().ui.projects.challenges }}</h5>
          <ul class="mt-3 space-y-2 text-sm text-text-secondary">
            <li *ngFor="let c of selected.challenges">• {{ c }}</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap gap-2">
        <span *ngFor="let s of selected.stack; let i = index"
          class="badge badge-anim"
          [style.animation-delay]="i * 60 + 'ms'">
          {{ s }}
        </span>
      </div>

      <div class="mt-6 flex flex-wrap gap-3">

        <button
    *ngIf="selected?.route"
    class="btn btn-primary"
    (click)="openDemo()">
    {{ data().ui.projects.viewDemo }}
  </button>

        <ng-container *ngFor="let l of selected.links">
  <a *ngIf="l.href !== '#'"
    [href]="l.href"
    target="_blank"
    rel="noreferrer"
    class="btn btn-primary">
    {{ l.label }}
  </a>
</ng-container>



      </div>

    </div>
  </div>

  <div *ngIf="fullscreenImage" class="fullscreen" (click)="closeFullscreen()">
    <button *ngIf="selected?.images?.length! > 1" class="fs-nav prev" (click)="prevImage(); $event.stopPropagation()">‹</button>
    <img [src]="selected?.images?.[currentImageIndex]" (click)="$event.stopPropagation()" />
    <button *ngIf="selected?.images?.length! > 1" class="fs-nav next" (click)="nextImage(); $event.stopPropagation()">›</button>
  </div>
  `,
  styles: [`
    .anim-hidden {
      opacity: 0;
      transform: translateY(24px) scale(0.97);
    }

    .anim-visible {
      animation: revealCard 0.45s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
      animation-delay: calc(var(--i, 0) * 120ms);
    }

    @keyframes revealCard {
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    article.card {
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
      cursor: default;
    }

    :host-context(:not(.dark)) article.card:hover {
      transform: translateY(-3px);
      border-color: var(--accent) var(--border-dark) var(--border-dark) var(--accent) !important;
      box-shadow: 2px 2px 8px rgba(0,0,128,0.25);
    }

    :host-context(.dark) article.card:hover {
      transform: translateY(-7px) scale(1.01);
      box-shadow: 0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(10,132,255,0.25);
    }

    :host-context(:not(.dark)) .modal {
      animation: xpMaximize 0.22s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
    }

    @keyframes xpMaximize {
      from { transform: scale(0.88); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }

    :host-context(.dark) .modal {
      animation: iosSheet 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }

    @keyframes iosSheet {
      from { transform: translateY(48px); opacity: 0; filter: blur(6px); }
      to   { transform: translateY(0);    opacity: 1; filter: blur(0);   }
    }

    .overlay {
      animation: overlayIn 0.2s ease forwards;
    }

    @keyframes overlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .carousel-img {
      animation: imgFade 0.25s ease forwards;
    }

    @keyframes imgFade {
      from { opacity: 0.3; transform: scale(0.98); }
      to   { opacity: 1;   transform: scale(1);    }
    }

    .badge-anim {
      opacity: 0;
      animation: badgePop 0.3s cubic-bezier(0.34, 1.5, 0.64, 1) forwards;
    }

    @keyframes badgePop {
      from { opacity: 0; transform: scale(0.7); }
      to   { opacity: 1; transform: scale(1);   }
    }

    .fullscreen {
      animation: fsIn 0.2s ease forwards;
    }

    @keyframes fsIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .project-img img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.55);
      display: grid;
      place-items: center;
      padding: 24px;
      z-index: 50;
    }

    .modal {
      width: min(900px, 100%);
      max-height: 85vh;
      overflow: auto;
    }

    .carousel {
      position: relative;
    }

    .carousel img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      border-radius: 8px;
    }

    .nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: var(--accent);
      color: var(--text-on-accent);
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: bold;
      opacity: 0.8;
    }

    .nav:hover { opacity: 1; }
    .prev { left: 10px; }
    .next { right: 10px; }

    .dots {
      display: flex;
      justify-content: center;
      gap: 8px;
    }

    .dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--text-secondary);
      opacity: 0.5;
      cursor: pointer;
      transition: background 0.2s, opacity 0.2s;
    }

    .dots span.active {
      background: var(--accent);
      opacity: 1;
    }

    .fullscreen {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.9);
      display: grid;
      place-items: center;
      z-index: 100;
      padding: 40px;
    }

    .fullscreen img {
      max-width: 95vw;
      max-height: 95vh;
      object-fit: contain;
      border-radius: 8px;
    }

    .fs-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 40px;
      background: rgba(0,0,0,.5);
      color: white;
      border: none;
      padding: 10px 18px;
      cursor: pointer;
      border-radius: 8px;
      user-select: none;
    }

    .fs-nav:hover { background: rgba(0,0,0,.8); }
    .fs-nav.prev { left: 40px; }
    .fs-nav.next { right: 40px; }
  `]
})
export class Projects {

  private router = inject(Router);
  private lang = inject(LanguageService);
  data = this.lang.data;
  selected: Project | null = null;
  currentImageIndex = 0;
  fullscreenImage: string | null = null;

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (!this.fullscreenImage) return;
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'ArrowLeft') this.prevImage();
    if (event.key === 'Escape') this.closeFullscreen();
  }

  open(p: Project) {
    this.selected = p;
    this.currentImageIndex = 0;
  }

  close() { this.selected = null; }

  nextImage() {
    if (!this.selected?.images) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.selected.images.length;
  }

  prevImage() {
    if (!this.selected?.images) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.selected.images.length) % this.selected.images.length;
  }

  openFullscreen(img: string) { this.fullscreenImage = img; }
  closeFullscreen() { this.fullscreenImage = null; }

  openDemo() {
    if (!this.selected?.route) return;
    this.router.navigate([this.selected.route]);
  }

}
