# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (ng serve)
npm run build      # Production build → dist/portfolio2026
npm run watch      # Watch mode build (development config)
npm test           # Run Karma/Jasmine tests
ng test --include='**/foo.spec.ts'  # Run a single test file
```

GitHub Pages deployment uses `angular-cli-ghpages`. Deploy via `ng deploy`.

## Architecture

Angular 20 standalone components — no NgModules anywhere. All components declare their own `imports: []`.

**Routing (`app.routes.ts`)**
- `/` → `PortfolioLayout` (wraps `navbar` + `footer`) with `home` as the child
- `/agenda`, `/gestion`, `/facturacion`, `/retail`, `/ecommerce` → standalone full-page project detail views (no layout wrapper)
- `**` → redirects to `/`

**Data flow**
All portfolio content lives in `src/app/portfolio.data.ts` as a typed `PortfolioData` object. Models are defined in `src/app/models/Portfolio.modes.ts` (`Project`, `Experience`, `SkillGroup`, `Link`, `PortfolioData`). Components receive data via `@Input()` or inject it directly.

**Services**
- `ThemeService` — manages dark/light toggle using Angular `signal()` + `effect()`, persists to `localStorage`, toggles `dark` class on `<html>`
- `AnimateOnScrollDirective` — standalone directive using `IntersectionObserver`; apply with `[animateOnScroll]` to trigger scroll-in animations

**Theming**
Tailwind is configured with `darkMode: 'class'` and all colors map to CSS custom properties defined in `src/styles.scss`. Light theme uses a retro Windows 95 aesthetic (teal/silver/navy); dark theme uses iOS-style (black/blur/iOS blue). Don't hardcode colors — use the CSS variables or Tailwind utilities like `bg-[var(--bg)]`.

**Animations**
Two animation styles defined in `src/styles.scss`:
- `.xpOpen` — Windows XP bounce (light mode)
- `.iosReveal` — iOS blur slide-up (dark mode)
- `.anim-hidden` / `.anim-visible` — controlled by `AnimateOnScrollDirective`

**Asset paths**
Static images live under `public/assets/projects/<project-name>/` and are referenced as `/assets/projects/...` in templates.
