import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="card p-8">

  <h3 class="text-2xl font-semibold text-text-primary">
    {{ data().ui.contact.title }}
  </h3>

  <p class="text-text-secondary mt-2">
    {{ data().ui.contact.subtitle }}
  </p>

  <div class="mt-6 space-y-4">

    <div class="flex flex-col gap-1">
      <label class="text-xs text-text-secondary">{{ data().ui.contact.name }}</label>
      <input
        type="text"
        [(ngModel)]="nombre"
        [placeholder]="data().ui.contact.namePlaceholder"
        class="input"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-xs text-text-secondary">{{ data().ui.contact.message }}</label>
      <textarea
        rows="4"
        [(ngModel)]="mensaje"
        [placeholder]="data().ui.contact.messagePlaceholder"
        class="input"
      ></textarea>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <a
        [href]="mailtoLink()"
        class="btn btn-primary flex-1 text-center">
        {{ data().ui.contact.sendEmail }}
      </a>
      <button
        (click)="enviarWhatsApp()"
        class="btn flex-1">
        {{ data().ui.contact.sendWhatsapp }}
      </button>
    </div>

  </div>

  <div class="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-sm text-text-secondary">
    <a href="mailto:mvranych@gmail.com" class="hover:opacity-80 transition">mvranych@gmail.com</a>
    <a href="https://www.linkedin.com/in/mateovranych/" target="_blank" rel="noreferrer" class="hover:opacity-80 transition">LinkedIn</a>
    <a href="https://github.com/mateovranych" target="_blank" rel="noreferrer" class="hover:opacity-80 transition">GitHub</a>
  </div>

</div>
  `,
})
export class Contact {

  private lang = inject(LanguageService);
  data = this.lang.data;
  nombre = '';
  mensaje = '';

  enviarWhatsApp() {
    const telefono = '5493512836055';
    const texto = this.data().ui.contact.whatsappTemplate
      .replace('{name}', this.nombre)
      .replace('{message}', this.mensaje);
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }

  mailtoLink() {
    const subject = encodeURIComponent('Contact from portfolio');
    const body = encodeURIComponent(this.data().ui.contact.whatsappTemplate
      .replace('{name}', this.nombre)
      .replace('{message}', this.mensaje));
    return `mailto:mvranych@gmail.com?subject=${subject}&body=${body}`;
  }

}
