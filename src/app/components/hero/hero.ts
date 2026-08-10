import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../services/animateOnScrollDirective.service';
import { ThemeService } from '../../services/theme.service';
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

  <div animateOnScroll class="anim-hidden os-stage" style="--i:2">
    <div class="os-flip" [class.flipped]="!theme.isDark()">

      <div class="os-face mac-window">
        <div class="mac-titlebar">
          <span class="mac-lights">
            <span class="mac-dot red"></span>
            <span class="mac-dot yellow"></span>
            <span class="mac-dot green"></span>
          </span>
          <span class="mac-title">{{ macTitle() }}</span>
        </div>
        <div class="mac-text">{{ notepadText() }}<span class="mac-cursor"></span></div>
      </div>

      <div class="os-face xp-window">
        <div class="xp-titlebar">
          <span class="xp-doc-icon">📝</span>
          <span class="xp-title">{{ xpTitle() }}</span>
          <span class="xp-controls">
            <span class="xp-btn">_</span>
            <span class="xp-btn">▢</span>
            <span class="xp-btn close">✕</span>
          </span>
        </div>
        <div class="xp-menu">
          <span *ngFor="let item of xpMenu()">{{ item }}</span>
        </div>
        <div class="xp-text">{{ notepadText() }}<span class="xp-cursor"></span></div>
      </div>

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

    .os-stage { perspective: 1600px; }

    .os-flip {
      position: relative;
      width: 100%;
      min-height: 440px;
      perspective: 1600px;
      animation: floaty 6s ease-in-out infinite;
    }

    @keyframes floaty {
      0%, 100% { translate: 0 0; }
      50%      { translate: 0 -9px; }
    }

    .os-face {
      position: absolute;
      inset: 0;
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      will-change: transform, opacity;
      transition: transform 0.8s cubic-bezier(0.6, 0.05, 0.2, 1), opacity 0s linear 0.4s;
    }

    .mac-window { transform: rotateY(0deg);   opacity: 1; }
    .xp-window  { transform: rotateY(180deg); opacity: 0; }

    .os-flip.flipped .mac-window { transform: rotateY(-180deg); opacity: 0; }
    .os-flip.flipped .xp-window  { transform: rotateY(0deg);    opacity: 1; }

    /* macOS — TextEdit */
    .mac-window {
      background: #1c1c1e;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 35px 70px -20px rgba(0,0,0,0.75);
    }
    .mac-titlebar {
      position: relative; display: flex; align-items: center;
      height: 40px; padding: 0 14px; flex-shrink: 0;
      background: linear-gradient(180deg, #3a3a3d, #2c2c2f);
      border-bottom: 1px solid rgba(0,0,0,0.4);
    }
    .mac-lights { display: flex; gap: 8px; z-index: 1; }
    .mac-dot { width: 12px; height: 12px; border-radius: 50%; }
    .mac-dot.red    { background: #ff5f57; }
    .mac-dot.yellow { background: #febc2e; }
    .mac-dot.green  { background: #28c840; }
    .mac-title {
      position: absolute; left: 0; right: 0; text-align: center;
      color: #b0b0b5; font-size: 13px; font-weight: 600; pointer-events: none;
    }
    .mac-text {
      flex: 1; background: #1c1c1e; padding: 18px 20px;
      font-family: 'SF Mono', 'Consolas', 'Courier New', monospace;
      font-size: 12.5px; color: #d4d4d8; white-space: pre-wrap;
      line-height: 1.6; overflow: auto;
    }
    .mac-cursor {
      display: inline-block; width: 7px; height: 14px; background: #e5e5ea;
      vertical-align: text-bottom; margin-left: 1px; animation: blink 1.1s steps(1) infinite;
    }

    /* Windows XP — Bloque de notas */
    .xp-window {
      background: #ece9d8;
      border: 1px solid #003ec9;
      box-shadow: 0 35px 70px -20px rgba(0,0,0,0.65);
      font-family: 'Tahoma', 'Segoe UI', sans-serif;
    }
    .xp-titlebar {
      display: flex; align-items: center; gap: 8px; padding: 5px 5px 5px 8px; flex-shrink: 0;
      background: linear-gradient(180deg, #3d95ff 0%, #1d6bf0 8%, #105ee0 45%, #1057dd 52%, #0a44c9 92%, #0a44c9 100%);
      color: #fff; font-size: 12.5px; font-weight: 700;
      text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
    }
    .xp-doc-icon { font-size: 13px; }
    .xp-title { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .xp-controls { display: flex; gap: 3px; }
    .xp-btn {
      width: 21px; height: 20px; display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; color: #fff; border: 1px solid #fff; border-radius: 3px;
      background: linear-gradient(180deg, #4f9bff, #135fdd);
      box-shadow: inset 0 0 2px rgba(255,255,255,0.6);
    }
    .xp-btn.close { background: linear-gradient(180deg, #f3a48f, #d8472b); }
    .xp-menu {
      display: flex; gap: 15px; padding: 4px 11px; background: #ece9d8; flex-shrink: 0;
      border-bottom: 1px solid #aca899; font-size: 12px; color: #1a1a1a;
    }
    .xp-text {
      flex: 1; background: #fff; margin: 3px; border: 1px solid #7f9db9;
      padding: 13px 15px; font-family: 'Consolas', 'Courier New', monospace;
      font-size: 12.5px; color: #000; white-space: pre-wrap; line-height: 1.6; overflow: auto;
    }
    .xp-cursor {
      display: inline-block; width: 7px; height: 14px; background: #000;
      vertical-align: text-bottom; margin-left: 1px; animation: blink 1.1s steps(1) infinite;
    }
    @keyframes blink { 50% { opacity: 0; } }

    @media (prefers-reduced-motion: reduce) {
      .os-flip { animation: none; }
    }
  `]
})
export class Hero {
  theme = inject(ThemeService);
  private lang = inject(LanguageService);
  data = this.lang.data;

  macTitle = computed(() =>
    this.lang.lang() === 'en' ? 'profile.txt — TextEdit' : 'perfil.txt — TextEdit'
  );

  xpTitle = computed(() =>
    this.lang.lang() === 'en' ? 'profile.txt — Notepad' : 'perfil.txt — Bloque de notas'
  );

  xpMenu = computed(() =>
    this.lang.lang() === 'en'
      ? ['File', 'Edit', 'Format', 'View', 'Help']
      : ['Archivo', 'Edición', 'Formato', 'Ver', 'Ayuda']
  );

  notepadText = computed(() => {
    const d = this.data();
    const isEn = this.lang.lang() === 'en';
    if (isEn) {
      return `  ${d.name}
  Sysadmin & Developer
  ${d.location}
  ------------------------------

  > Cloud infrastructure:
    AWS, Azure, Docker,
    Kubernetes

  > CI/CD pipelines, monitoring
    and incident response

  > 5+ production systems
    built and operated end-to-end

  Stack: K8s · Docker · AWS ·
  Azure · .NET · Angular`;
    }
    return `  ${d.name}
  Sysadmin & Developer
  ${d.location}
  ------------------------------

  > Infraestructura cloud:
    AWS, Azure, Docker,
    Kubernetes

  > Pipelines CI/CD, monitoreo
    e incident response

  > 5+ sistemas en producción
    construidos y operados end-to-end

  Stack: K8s · Docker · AWS ·
  Azure · .NET · Angular`;
  });
}
