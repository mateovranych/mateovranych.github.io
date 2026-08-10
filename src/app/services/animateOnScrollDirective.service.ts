import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[animateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() delay = 0;

  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const el = this.el.nativeElement;
    el.classList.add('anim-hidden');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.timer = setTimeout(() => el.classList.add('anim-visible'), this.delay);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    clearTimeout(this.timer);
  }
}
