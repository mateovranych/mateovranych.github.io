import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DemoHeaderComponent } from '../../components/demo-header/demo-header';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  disponible: boolean;
  confirmado: boolean;
  asistio: boolean;
  paciente?: string;
  odontologo?: string;
  obraSocial?: string;
  observaciones?: string;
}

interface ModalData {
  mode: 'detalle' | 'reservar' | 'editar';
  turno: Turno;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, DemoHeaderComponent],
  template: `
  <app-demo-header title="SC Dental · Agenda"></app-demo-header>

  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-icon">🦷</div>
        <div>
          <div class="brand-name">DentalPro</div>
          <div class="brand-sub">Sistema de Turnos</div>
        </div>
      </div>

      <div class="doctor-selector">
        <div class="selector-label">Odontólogo</div>
        <div class="doctor-list">
          <div *ngFor="let doc of odontologos"
               class="doctor-item"
               [class.active]="calendarioSeleccionado === doc.id"
               (click)="seleccionarCalendario(doc.id)">
            <div class="doctor-avatar">{{ doc.nombre[0] }}</div>
            <div>
              <div class="doctor-nombre">{{ doc.nombre }}</div>
              <div class="doctor-esp">{{ doc.especialidad }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="legend">
        <div class="legend-title">Referencias</div>
        <div class="legend-item"><span class="legend-dot disponible"></span> Disponible</div>
        <div class="legend-item"><span class="legend-dot reservado"></span> Reservado</div>
        <div class="legend-item"><span class="legend-dot confirmado"></span> Confirmado</div>
        <div class="legend-item"><span class="legend-dot asistio"></span> Asistió</div>
      </div>
    </aside>

    <main class="main">
      <div class="semana-nav">
        <button class="btn-nav" (click)="semanaAnterior()" [disabled]="!hayAnterior">
          ← Semana anterior
        </button>
        <div class="titulo-semana">
          <span class="semana-label">Semana del</span>
          <span class="semana-fecha">{{ tituloSemana }}</span>
        </div>
        <button class="btn-nav" (click)="semanaSiguiente()" [disabled]="!haySiguiente">
          Semana siguiente →
        </button>
      </div>

      <div class="stats-bar">
        <div class="stat">
          <span class="stat-num">{{ stats.disponibles }}</span>
          <span class="stat-label">Disponibles</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ stats.reservados }}</span>
          <span class="stat-label">Reservados</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ stats.confirmados }}</span>
          <span class="stat-label">Confirmados</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ stats.asistidos }}</span>
          <span class="stat-label">Asistieron</span>
        </div>
      </div>

      <div class="contenedor-calendario">
        <table>
          <thead>
            <tr>
              <th class="th-hora">Horario</th>
              <th *ngFor="let dia of diasSemana" [class.hoy]="esHoy(dia)">
                <div class="th-dia-nombre">{{ dia.nombre }}</div>
                <div class="th-dia-fecha">{{ dia.fecha }}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let hora of horarios">
              <td class="td-hora">{{ hora }}</td>
              <td *ngFor="let dia of diasSemana"
                  [class.hoy-col]="esHoy(dia)">
                <ng-container *ngIf="getTurno(dia.fechaKey, hora) as turno; else sinTurno">
                  <div class="celda-turno"
                       [ngClass]="estiloTurno(turno)"
                       (click)="clickTurno(turno, dia, hora)">
                    <span class="turno-texto">
                      {{ textoTurno(turno) }}
                    </span>
                    <span *ngIf="!turno.disponible && turno.paciente" class="turno-paciente">
                      {{ turno.paciente.split(' ')[1] || turno.paciente }}
                    </span>
                  </div>
                </ng-container>
                <ng-template #sinTurno>
                  <div class="celda-vacia"></div>
                </ng-template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>

  <div *ngIf="modal" class="overlay" (click)="cerrarModal()">
    <div class="modal-card" (click)="$event.stopPropagation()">

      <ng-container *ngIf="modal.mode === 'detalle'">
        <div class="modal-header">
          <h3>Detalle del turno</h3>
          <button class="close-btn" (click)="cerrarModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="detalle-row">
            <span class="detalle-label">Paciente</span>
            <span class="detalle-val">{{ modal.turno.paciente }}</span>
          </div>
          <div class="detalle-row">
            <span class="detalle-label">Odontólogo</span>
            <span class="detalle-val">{{ modal.turno.odontologo }}</span>
          </div>
          <div class="detalle-row">
            <span class="detalle-label">Obra Social</span>
            <span class="detalle-val">{{ modal.turno.obraSocial }}</span>
          </div>
          <div class="detalle-row" *ngIf="modal.turno.observaciones">
            <span class="detalle-label">Observaciones</span>
            <span class="detalle-val">{{ modal.turno.observaciones }}</span>
          </div>
          <div class="detalle-row">
            <span class="detalle-label">Estado</span>
            <span class="badge-estado" [ngClass]="estiloTurno(modal.turno)">
              {{ textoTurno(modal.turno) }}
            </span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" (click)="cerrarModal()">Cerrar</button>
          <button class="btn-warning" (click)="abrirEditar()">Editar</button>
          <button class="btn-danger" (click)="cancelarTurno(modal.turno)">Cancelar turno</button>
        </div>
      </ng-container>

      <ng-container *ngIf="modal.mode === 'reservar'">
        <div class="modal-header">
          <h3>Reservar turno</h3>
          <button class="close-btn" (click)="cerrarModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Paciente</label>
            <select [(ngModel)]="form.paciente">
              <option value="">— Seleccionar —</option>
              <option *ngFor="let p of pacientes" [value]="p">{{ p }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Obra Social</label>
            <select [(ngModel)]="form.obraSocial">
              <option value="">— Seleccionar —</option>
              <option *ngFor="let o of obrasSociales" [value]="o">{{ o }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Observaciones</label>
            <textarea [(ngModel)]="form.observaciones" rows="3" placeholder="Opcional..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" (click)="cerrarModal()">Cancelar</button>
          <button class="btn-primary" (click)="confirmarReserva()" [disabled]="!form.paciente">
            Reservar
          </button>
        </div>
      </ng-container>

      <ng-container *ngIf="modal.mode === 'editar'">
        <div class="modal-header">
          <h3>Editar turno</h3>
          <button class="close-btn" (click)="cerrarModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Paciente</label>
            <select [(ngModel)]="form.paciente">
              <option *ngFor="let p of pacientes" [value]="p">{{ p }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Obra Social</label>
            <select [(ngModel)]="form.obraSocial">
              <option *ngFor="let o of obrasSociales" [value]="o">{{ o }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Observaciones</label>
            <textarea [(ngModel)]="form.observaciones" rows="3"></textarea>
          </div>
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" [(ngModel)]="form.asistio">
              Marcado como asistió
            </label>
          </div>
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" [(ngModel)]="form.confirmado">
              Confirmado
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" (click)="cerrarModal()">Cancelar</button>
          <button class="btn-primary" (click)="guardarEdicion()">Guardar</button>
        </div>
      </ng-container>

    </div>
  </div>

  <div class="toast" [class.show]="toastVisible">
    <span class="toast-icon">{{ toastIcon }}</span> {{ toastMsg }}
  </div>
  `,
  styles: [`
    :host {
      --azul: #1a56db;
      --azul-dark: #1341b3;
      --azul-light: #dbeafe;
      --verde: #16a34a;
      --verde-light: #dcfce7;
      --rojo: #dc2626;
      --rojo-light: #fee2e2;
      --lila: #7c3aed;
      --lila-light: #ede9fe;
      --amarillo: #ca8a04;
      --amarillo-light: #fef9c3;
      --gris: #6b7280;
      --gris-light: #f3f4f6;
      --sidebar-w: 240px;
      --font: 'Segoe UI', system-ui, sans-serif;
      display: block;
      min-height: 100vh;
      background: #f0f4ff;
      font-family: var(--font);
    }

    .app-shell {
      display: flex;
      min-height: calc(100vh - 45px);
    }

    .sidebar {
      width: var(--sidebar-w);
      min-width: var(--sidebar-w);
      background: #fff;
      border-right: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 20px 16px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .brand-icon { font-size: 1.6rem; }
    .brand-name { font-weight: 700; font-size: 1rem; color: #111827; }
    .brand-sub { font-size: 0.72rem; color: #6b7280; }

    .selector-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      margin-bottom: 8px;
    }

    .doctor-list { display: flex; flex-direction: column; gap: 6px; }

    .doctor-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;
      border: 1px solid transparent;
    }

    .doctor-item:hover { background: #f0f4ff; }

    .doctor-item.active {
      background: var(--azul-light);
      border-color: #bfdbfe;
    }

    .doctor-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--azul);
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 0.85rem;
      flex-shrink: 0;
    }

    .doctor-nombre { font-size: 0.85rem; font-weight: 600; color: #111827; }
    .doctor-esp { font-size: 0.72rem; color: #6b7280; }

    .legend { margin-top: auto; }
    .legend-title {
      font-size: 0.72rem;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      margin-bottom: 10px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      color: #374151;
      margin-bottom: 6px;
    }
    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .legend-dot.disponible { background: #86efac; }
    .legend-dot.reservado { background: #fca5a5; }
    .legend-dot.confirmado { background: #c4b5fd; }
    .legend-dot.asistio { background: #fde68a; }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 20px;
      gap: 16px;
    }

    .semana-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 12px 16px;
    }

    .btn-nav {
      padding: 7px 16px;
      background: var(--azul);
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      transition: background 0.2s, transform 0.15s;
    }

    .btn-nav:hover:not(:disabled) {
      background: var(--azul-dark);
      transform: translateY(-1px);
    }

    .btn-nav:disabled {
      background: #d1d5db;
      cursor: not-allowed;
    }

    .titulo-semana {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .semana-label { font-size: 0.72rem; color: #9ca3af; }
    .semana-fecha { font-size: 1rem; font-weight: 700; color: #111827; }

    .stats-bar {
      display: flex;
      gap: 12px;
    }

    .stat {
      flex: 1;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 12px;
      text-align: center;
    }

    .stat-num {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--azul);
    }

    .stat-label {
      font-size: 0.72rem;
      color: #6b7280;
    }

    .contenedor-calendario {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: auto;
      flex: 1;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      min-width: 600px;
    }

    thead tr {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    th {
      background: var(--azul);
      color: #fff;
      padding: 10px 6px;
      font-size: 0.82rem;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.1);
    }

    th.hoy {
      background: var(--azul-dark);
      border-bottom: 3px solid #facc15;
    }

    .th-hora { min-width: 72px; width: 72px; }
    .th-dia-nombre { font-weight: 600; }
    .th-dia-fecha { font-size: 0.72rem; opacity: 0.85; }

    td {
      border: 1px solid #e5e7eb;
      padding: 0;
      height: 46px;
    }

    .td-hora {
      background: var(--azul);
      color: #fff;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0 6px;
    }

    .hoy-col { background: #fffbeb; }

    .celda-turno {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 2px;
      transition: filter 0.15s;
    }

    .celda-turno:hover { filter: brightness(0.93); }

    .celda-vacia {
      height: 100%;
      background: #f9fafb;
    }

    .turno-texto {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .turno-paciente {
      font-size: 0.68rem;
      opacity: 0.75;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
    }

    .turno-disponible {
      background: var(--verde-light);
      color: var(--verde);
    }

    .turno-reservado {
      background: var(--rojo-light);
      color: var(--rojo);
    }

    .turno-confirmado {
      background: var(--lila-light);
      color: var(--lila);
    }

    .turno-asistio {
      background: var(--amarillo-light);
      color: var(--amarillo);
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: grid;
      place-items: center;
      z-index: 300;
      animation: fadeIn 0.18s ease;
    }

    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

    .modal-card {
      background: #fff;
      border-radius: 14px;
      width: min(480px, 95vw);
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      animation: slideUp 0.22s cubic-bezier(0.34, 1.3, 0.64, 1);
      overflow: hidden;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      color: #111827;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.1rem;
      color: #9ca3af;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      transition: background 0.15s;
    }

    .close-btn:hover { background: #f3f4f6; color: #374151; }

    .modal-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
    .modal-footer {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
      flex-wrap: wrap;
    }

    .detalle-row {
      display: flex;
      gap: 12px;
      align-items: baseline;
    }
    .detalle-label {
      font-size: 0.78rem;
      color: #9ca3af;
      min-width: 100px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .detalle-val {
      font-size: 0.9rem;
      color: #111827;
    }

    .badge-estado {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .form-group label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #374151;
    }
    .form-group select,
    .form-group textarea {
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 0.9rem;
      font-family: inherit;
      color: #111827;
      background: #fff;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: var(--azul);
    }
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .checkbox-group input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: var(--azul);
    }

    .btn-primary {
      padding: 8px 18px;
      background: var(--azul);
      color: #fff;
      border: none;
      border-radius: 7px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover:not(:disabled) { background: var(--azul-dark); }
    .btn-primary:disabled { background: #d1d5db; cursor: not-allowed; }

    .btn-secondary {
      padding: 8px 18px;
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
      border-radius: 7px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-secondary:hover { background: #e5e7eb; }

    .btn-warning {
      padding: 8px 18px;
      background: #fffbeb;
      color: var(--amarillo);
      border: 1px solid #fde68a;
      border-radius: 7px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-warning:hover { background: #fef9c3; }

    .btn-danger {
      padding: 8px 18px;
      background: #fff1f2;
      color: var(--rojo);
      border: 1px solid #fecaca;
      border-radius: 7px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-danger:hover { background: var(--rojo-light); }

    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: #111827;
      color: #fff;
      padding: 10px 20px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 500;
      z-index: 999;
      transition: transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.3s;
      opacity: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    @media (max-width: 768px) {
      .sidebar { display: none; }
      .stats-bar { gap: 6px; }
      .stat-num { font-size: 1.2rem; }
    }
  `]
})
export class Agenda implements OnInit {

  odontologos = [
    { id: 1, nombre: 'Dra. López',   especialidad: 'Ortodoncia' },
    { id: 2, nombre: 'Dr. Martínez', especialidad: 'Endodoncia' },
    { id: 3, nombre: 'Dra. Sánchez', especialidad: 'Periodoncia' },
  ];

  pacientes = [
    'García, Juan', 'Fernández, Ana', 'Rodríguez, Carlos',
    'Martínez, Laura', 'González, Pedro', 'López, Sofía',
    'Díaz, Martín', 'Torres, Elena', 'Ramírez, Diego',
    'Flores, Valentina'
  ];

  obrasSociales = ['OSDE 210', 'PAMI', 'Swiss Medical', 'Galeno', 'Particular', 'IOMA'];

  horarios = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
              '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];

  calendarioSeleccionado = 1;
  inicioSemanaOffset = 0; // semanas desde hoy
  diasSemana: { nombre: string; fecha: string; fechaKey: string }[] = [];
  turnosCache: { [calId: number]: { [key: string]: Turno } } = {};
  turnosMap: { [key: string]: Turno } = {};
  modal: ModalData | null = null;
  form: any = {};
  toastMsg = '';
  toastIcon = '✓';
  toastVisible = false;
  private _toastTimer: any;
  private turnoEditando: Turno | null = null;

  get hayAnterior() { return this.inicioSemanaOffset > -4; }
  get haySiguiente() { return this.inicioSemanaOffset < 4; }

  get tituloSemana() {
    const lunes = this.getLunes();
    const dom = new Date(lunes);
    dom.setDate(dom.getDate() + 6);
    return `${this.fmt(lunes)} al ${this.fmt(dom)}`;
  }

  get stats() {
    const turnos = Object.values(this.turnosMap);
    return {
      disponibles: turnos.filter(t => t.disponible).length,
      reservados:  turnos.filter(t => !t.disponible && !t.confirmado && !t.asistio).length,
      confirmados: turnos.filter(t => t.confirmado && !t.asistio).length,
      asistidos:   turnos.filter(t => t.asistio).length,
    };
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.generarCalendario();
    this.generarTurnosSiNo();
  }

  getLunes(): Date {
    const hoy = new Date();
    const dia = hoy.getDay() || 7;
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - dia + 1 + this.inicioSemanaOffset * 7);
    lunes.setHours(0,0,0,0);
    return lunes;
  }

  generarCalendario() {
    const lunes = this.getLunes();
    const nombres = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    this.diasSemana = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(lunes);
      d.setDate(lunes.getDate() + i);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      this.diasSemana.push({
        nombre:   nombres[i],
        fecha:    `${dd}/${mm}`,
        fechaKey: `${dd}/${mm}`
      });
    }
  }

  generarTurnosSiNo() {
    const calId = this.calendarioSeleccionado;
    if (this.turnosCache[calId]) {
      this.turnosMap = this.turnosCache[calId];
      return;
    }

    const mapa: { [key: string]: Turno } = {};
    const pacs = this.pacientes;
    const obs   = ['Control de rutina','Revisión de brackets','Dolor en muela','Limpieza dental'];
    const osSoc = this.obrasSociales;
    const doc   = this.odontologos.find(o => o.id === calId)!;
    let idCounter = 1;

    for (const dia of this.diasSemana) {
      if ([5,6].includes(this.diasSemana.indexOf(dia)) && Math.random() < 0.6) continue; // fin de semana menos turnos

      for (const hora of this.horarios) {
        const r = Math.random();
        let turno: Turno;

        if (r < 0.28) {
          turno = { id: idCounter++, fecha: dia.fechaKey, hora, disponible: true, confirmado: false, asistio: false };
        } else if (r < 0.58) {
          turno = {
            id: idCounter++, fecha: dia.fechaKey, hora,
            disponible: false, confirmado: false, asistio: false,
            paciente:    pacs[Math.floor(Math.random() * pacs.length)],
            odontologo:  doc.nombre,
            obraSocial:  osSoc[Math.floor(Math.random() * osSoc.length)],
            observaciones: Math.random() > 0.5 ? obs[Math.floor(Math.random() * obs.length)] : undefined
          };
        } else if (r < 0.78) {
          turno = {
            id: idCounter++, fecha: dia.fechaKey, hora,
            disponible: false, confirmado: true, asistio: false,
            paciente:    pacs[Math.floor(Math.random() * pacs.length)],
            odontologo:  doc.nombre,
            obraSocial:  osSoc[Math.floor(Math.random() * osSoc.length)],
          };
        } else {
          turno = {
            id: idCounter++, fecha: dia.fechaKey, hora,
            disponible: false, confirmado: true, asistio: true,
            paciente:    pacs[Math.floor(Math.random() * pacs.length)],
            odontologo:  doc.nombre,
            obraSocial:  osSoc[Math.floor(Math.random() * osSoc.length)],
          };
        }

        mapa[`${dia.fechaKey}_${hora}`] = turno;
      }
    }

    this.turnosCache[calId] = mapa;
    this.turnosMap = mapa;
  }

  seleccionarCalendario(id: number) {
    this.calendarioSeleccionado = id;
    this.turnosMap = {};
    this.generarTurnosSiNo();
  }

  semanaAnterior() {
    if (!this.hayAnterior) return;
    this.inicioSemanaOffset--;
    this.generarCalendario();
    this.generarTurnosSiNo();
  }

  semanaSiguiente() {
    if (!this.haySiguiente) return;
    this.inicioSemanaOffset++;
    this.generarCalendario();
    this.generarTurnosSiNo();
  }

  getTurno(fechaKey: string, hora: string): Turno | undefined {
    return this.turnosMap[`${fechaKey}_${hora}`];
  }

  esHoy(dia: { fechaKey: string }): boolean {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2,'0');
    const mm = String(hoy.getMonth()+1).padStart(2,'0');
    return dia.fechaKey === `${dd}/${mm}`;
  }

  estiloTurno(t: Turno): string {
    if (t.disponible)  return 'celda-turno turno-disponible';
    if (t.asistio)     return 'celda-turno turno-asistio';
    if (t.confirmado)  return 'celda-turno turno-confirmado';
    return 'celda-turno turno-reservado';
  }

  textoTurno(t: Turno): string {
    if (t.disponible) return 'Disponible';
    if (t.asistio)    return 'Asistió';
    if (t.confirmado) return 'Confirmado';
    return 'Reservado';
  }

  fmt(d: Date) {
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
  }

  clickTurno(turno: Turno, dia: any, hora: string) {
    if (!turno.disponible) {
      this.modal = { mode: 'detalle', turno };
      return;
    }
    this.form = { paciente: '', obraSocial: '', observaciones: '', asistio: false, confirmado: false };
    this.turnoEditando = turno;
    this.modal = { mode: 'reservar', turno };
  }

  abrirEditar() {
    if (!this.modal) return;
    const t = this.modal.turno;
    this.turnoEditando = t;
    this.form = {
      paciente:     t.paciente ?? '',
      obraSocial:   t.obraSocial ?? '',
      observaciones: t.observaciones ?? '',
      asistio:      t.asistio,
      confirmado:   t.confirmado
    };
    this.modal = { mode: 'editar', turno: t };
  }

  confirmarReserva() {
    const t = this.turnoEditando!;
    const doc = this.odontologos.find(o => o.id === this.calendarioSeleccionado)!;
    t.disponible   = false;
    t.confirmado   = false;
    t.asistio      = false;
    t.paciente     = this.form.paciente;
    t.odontologo   = doc.nombre;
    t.obraSocial   = this.form.obraSocial;
    t.observaciones= this.form.observaciones;
    this.turnosMap = { ...this.turnosMap };
    this.cerrarModal();
    this.toast('✓', 'Turno reservado correctamente');
  }

  guardarEdicion() {
    const t = this.turnoEditando!;
    t.paciente     = this.form.paciente;
    t.obraSocial   = this.form.obraSocial;
    t.observaciones= this.form.observaciones;
    t.asistio      = this.form.asistio;
    t.confirmado   = this.form.confirmado;
    this.turnosMap = { ...this.turnosMap };
    this.cerrarModal();
    this.toast('✓', 'Turno editado correctamente');
  }

  cancelarTurno(turno: Turno) {
    turno.disponible  = true;
    turno.confirmado  = false;
    turno.asistio     = false;
    turno.paciente    = undefined;
    turno.odontologo  = undefined;
    turno.obraSocial  = undefined;
    turno.observaciones = undefined;
    this.turnosMap = { ...this.turnosMap };
    this.cerrarModal();
    this.toast('🗑', 'Turno cancelado');
  }

  cerrarModal() { this.modal = null; this.turnoEditando = null; }

  toast(icon: string, msg: string) {
    this.toastIcon = icon;
    this.toastMsg = msg;
    this.toastVisible = true;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.toastVisible = false, 2800);
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.cerrarModal(); }

  goBack() {
    this.router.navigate(['/']);
  }
}