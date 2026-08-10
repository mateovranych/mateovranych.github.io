import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DemoHeaderComponent } from '../../components/demo-header/demo-header';

interface Socio {
  id: number;
  nombre: string;
  plan: string;
  vencimiento: Date;
  estado: 'al-dia' | 'por-vencer' | 'vencido';
  avatar: string;
}

interface Cobro {
  id: number;
  socio: string;
  plan: string;
  monto: number;
  fecha: Date;
  metodo: 'efectivo' | 'transferencia' | 'tarjeta' | 'mp';
}

interface AsistenciaDia {
  dia: string;
  total: number;
  manana: number;
  tarde: number;
  noche: number;
}

interface IngresoMes {
  mes: string;
  monto: number;
}

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule, DemoHeaderComponent],
  templateUrl: './gestion.html',
  styleUrl: './gestion.scss'
})
export class GestionComponent implements OnInit {

  sociosActivos = 143;
  sociosNuevosEsteMes = 12;
  ingresosMes = 2_870_500;
  ingresosVariacion = 8.4;
  asistenciaHoy = 37;
  asistenciaPromedioSemana = 42;
  profesoresActivos = 7;

  sociosRecientes: Socio[] = [
    { id: 1,  nombre: 'Valentina Morales',   plan: 'Pase Libre Mensual',    vencimiento: new Date(2026, 2, 28), estado: 'al-dia',      avatar: 'VM' },
    { id: 2,  nombre: 'Tomás Ferreyra',      plan: 'Plan 3 Meses',         vencimiento: new Date(2026, 3, 10), estado: 'al-dia',      avatar: 'TF' },
    { id: 3,  nombre: 'Luciana Paz',         plan: 'Pase Libre Mensual',    vencimiento: new Date(2026, 2, 18), estado: 'por-vencer',  avatar: 'LP' },
    { id: 4,  nombre: 'Matías Ortega',       plan: 'Plan Anual',           vencimiento: new Date(2026, 7, 5),  estado: 'al-dia',      avatar: 'MO' },
    { id: 5,  nombre: 'Carolina Suárez',     plan: 'Pase Libre Mensual',    vencimiento: new Date(2026, 2, 10), estado: 'vencido',     avatar: 'CS' },
    { id: 6,  nombre: 'Ignacio Ramírez',     plan: 'Plan 3 Meses',         vencimiento: new Date(2026, 4, 22), estado: 'al-dia',      avatar: 'IR' },
    { id: 7,  nombre: 'Florencia Gómez',     plan: 'Pase Libre Mensual',    vencimiento: new Date(2026, 2, 20), estado: 'por-vencer',  avatar: 'FG' },
    { id: 8,  nombre: 'Rodrigo Villanueva',  plan: 'Plan 6 Meses',         vencimiento: new Date(2026, 6, 1),  estado: 'al-dia',      avatar: 'RV' },
  ];

  cobrosRecientes: Cobro[] = [
    { id: 1, socio: 'Valentina Morales',  plan: 'Pase Libre Mensual', monto: 25000,  fecha: new Date(2026, 2, 13), metodo: 'mp'           },
    { id: 2, socio: 'Tomás Ferreyra',     plan: 'Plan 3 Meses',      monto: 65000,  fecha: new Date(2026, 2, 13), metodo: 'transferencia' },
    { id: 3, socio: 'Matías Ortega',      plan: 'Plan Anual',        monto: 220000, fecha: new Date(2026, 2, 12), metodo: 'tarjeta'       },
    { id: 4, socio: 'Ignacio Ramírez',    plan: 'Plan 3 Meses',      monto: 65000,  fecha: new Date(2026, 2, 12), metodo: 'efectivo'      },
    { id: 5, socio: 'Rodrigo Villanueva', plan: 'Plan 6 Meses',      monto: 120000, fecha: new Date(2026, 2, 11), metodo: 'mp'            },
    { id: 6, socio: 'Florencia Gómez',    plan: 'Pase Libre Mensual', monto: 25000,  fecha: new Date(2026, 2, 11), metodo: 'transferencia' },
  ];

  asistenciaSemana: AsistenciaDia[] = [
    { dia: 'Lun', total: 51, manana: 20, tarde: 18, noche: 13 },
    { dia: 'Mar', total: 44, manana: 16, tarde: 17, noche: 11 },
    { dia: 'Mié', total: 58, manana: 22, tarde: 21, noche: 15 },
    { dia: 'Jue', total: 39, manana: 14, tarde: 15, noche: 10 },
    { dia: 'Vie', total: 47, manana: 18, tarde: 16, noche: 13 },
    { dia: 'Sáb', total: 62, manana: 30, tarde: 22, noche: 10 },
    { dia: 'Hoy', total: 37, manana: 21, tarde: 16, noche:  0 },
  ];

  ingresos6Meses: IngresoMes[] = [
    { mes: 'Oct', monto: 2_210_000 },
    { mes: 'Nov', monto: 2_380_000 },
    { mes: 'Dic', monto: 2_150_000 },
    { mes: 'Ene', monto: 2_640_000 },
    { mes: 'Feb', monto: 2_650_000 },
    { mes: 'Mar', monto: 2_870_500 },
  ];

  maxAsistencia = 0;
  maxIngreso = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.maxAsistencia = Math.max(...this.asistenciaSemana.map(d => d.total));
    this.maxIngreso    = Math.max(...this.ingresos6Meses.map(m => m.monto));
  }

  goBack() {
    this.router.navigate(['/']);
  }

  barHeight(value: number, max: number): number {
    return Math.round((value / max) * 100);
  }

  formatMonto(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
  }

  metodoBadge(m: string): string {
    const map: Record<string, string> = {
      efectivo: 'badge-efectivo',
      transferencia: 'badge-transferencia',
      tarjeta: 'badge-tarjeta',
      mp: 'badge-mp',
    };
    return map[m] ?? '';
  }

  metodoLabel(m: string): string {
    const map: Record<string, string> = {
      efectivo: 'Efectivo',
      transferencia: 'Transf.',
      tarjeta: 'Tarjeta',
      mp: 'Mercado Pago',
    };
    return map[m] ?? m;
  }

  estadoBadgeClass(e: string): string {
    const map: Record<string, string> = {
      'al-dia':     'estado-al-dia',
      'por-vencer': 'estado-por-vencer',
      'vencido':    'estado-vencido',
    };
    return map[e] ?? '';
  }

  estadoLabel(e: string): string {
    const map: Record<string, string> = {
      'al-dia':     'Al día',
      'por-vencer': 'Por vencer',
      'vencido':    'Vencido',
    };
    return map[e] ?? e;
  }

  get sociosPorVencer(): number {
    return this.sociosRecientes.filter(s => s.estado === 'por-vencer').length;
  }
  get sociosVencidos(): number {
    return this.sociosRecientes.filter(s => s.estado === 'vencido').length;
  }
}
