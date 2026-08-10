import {
  Component, OnInit, Output, EventEmitter, HostListener, Pipe, PipeTransform
} from '@angular/core';

@Pipe({ name: 'filterItems', standalone: true })
export class FilterItemsPipe implements PipeTransform {
  transform(items: any[], esServicio: boolean): any[] {
    return items.filter(i => i.esServicio === esServicio);
  }
}
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Factura } from '../facturacion';

interface ClienteMin {
  id: number;
  razonSocial: string;
  condicionIVA: string;
  condicionIvaId: number;
  listaPrecioNombre: string;
}

interface ItemMin {
  id: number;
  codigo: string;
  descripcion: string;
  esServicio: boolean;
  precioBase: number;
}

interface TipoComprobante {
  id: number;
  nombre: string;
  codigoAfip: number;
}

@Component({
  selector: 'app-facturacion-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FilterItemsPipe],
  templateUrl: './facturacion-dialog.html',
  styleUrl: './facturacion-dialog.scss'
})
export class FacturacionDialog implements OnInit {

  @Output() emitida = new EventEmitter<Omit<Factura, 'id' | 'numeroComprobante' | 'cae' | 'autorizadaEnARCA'>>();
  @Output() cancelado = new EventEmitter<void>();

  form!: FormGroup;
  guardando = false;

  filtroClientesCtrl = new FormControl('');
  clientesFiltrados: ClienteMin[] = [];
  clienteSeleccionado: ClienteMin | null = null;

  private readonly IVA = 0.21;
  private readonly PUNTO_VENTA = 10;

  clientes: ClienteMin[] = [
    { id: 1, razonSocial: 'Distribuidora El Progreso S.A.', condicionIVA: 'Responsable Inscripto', condicionIvaId: 1, listaPrecioNombre: 'Lista Mayorista A' },
    { id: 2, razonSocial: 'Supermercado Norte S.R.L.',      condicionIVA: 'Responsable Inscripto', condicionIvaId: 1, listaPrecioNombre: 'Lista Mayorista B' },
    { id: 3, razonSocial: 'Mayorista del Centro S.A.',      condicionIVA: 'Responsable Inscripto', condicionIvaId: 1, listaPrecioNombre: 'Lista Mayorista A' },
    { id: 4, razonSocial: 'Comercio Rodriguez',             condicionIVA: 'Monotributista',        condicionIvaId: 2, listaPrecioNombre: 'Lista Minorista' },
    { id: 5, razonSocial: 'Ferreteria Lopez',               condicionIVA: 'Consumidor Final',      condicionIvaId: 4, listaPrecioNombre: 'Lista Minorista' },
    { id: 6, razonSocial: 'Panaderia Martinez',             condicionIVA: 'Monotributista',        condicionIvaId: 2, listaPrecioNombre: 'Lista Minorista' },
    { id: 7, razonSocial: 'Constructora Vidal S.A.',        condicionIVA: 'Responsable Inscripto', condicionIvaId: 1, listaPrecioNombre: 'Lista Mayorista A' },
    { id: 8, razonSocial: 'Kiosco El Sol',                  condicionIVA: 'Consumidor Final',      condicionIvaId: 4, listaPrecioNombre: 'Lista Minorista' },
  ];

  items: ItemMin[] = [
    { id: 1,  codigo: 'PRD-001', descripcion: 'Aceite de soja 900ml x12',       esServicio: false, precioBase: 1450 },
    { id: 2,  codigo: 'PRD-002', descripcion: 'Harina 000 1kg x10',             esServicio: false, precioBase: 540  },
    { id: 3,  codigo: 'PRD-003', descripcion: 'Azucar Ledesma 1kg x10',         esServicio: false, precioBase: 590  },
    { id: 4,  codigo: 'PRD-004', descripcion: 'Arroz Gallo Oro 1kg x10',        esServicio: false, precioBase: 680  },
    { id: 5,  codigo: 'PRD-005', descripcion: 'Fideos Don Victorio 500g x20',   esServicio: false, precioBase: 560  },
    { id: 6,  codigo: 'PRD-006', descripcion: 'Leche La Serenisima 1L x12',     esServicio: false, precioBase: 820  },
    { id: 7,  codigo: 'PRD-007', descripcion: 'Galletitas Oreo 144g x24',       esServicio: false, precioBase: 750  },
    { id: 8,  codigo: 'PRD-008', descripcion: 'Yerba Taragui 1kg x10',          esServicio: false, precioBase: 1890 },
    { id: 9,  codigo: 'PRD-009', descripcion: 'Detergente Magistral 750ml x12', esServicio: false, precioBase: 890  },
    { id: 10, codigo: 'PRD-010', descripcion: 'Papel higienico Higienol x4 x12',esServicio: false, precioBase: 920  },
    { id: 11, codigo: 'SRV-001', descripcion: 'Servicio de flete zona norte',    esServicio: true,  precioBase: 8500 },
    { id: 12, codigo: 'SRV-002', descripcion: 'Servicio de almacenamiento',      esServicio: true,  precioBase: 12000 },
    { id: 13, codigo: 'SRV-003', descripcion: 'Comision por gestion comercial',  esServicio: true,  precioBase: 5000 },
  ];

  tiposComprobante: TipoComprobante[] = [
    { id: 1, nombre: 'Factura A', codigoAfip: 1  },
    { id: 2, nombre: 'Factura B', codigoAfip: 6  },
    { id: 3, nombre: 'Factura C', codigoAfip: 11 },
  ];

  itemsFiltrados: ItemMin[] = [];
  filtroItemsCtrl = new FormControl('');

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.clientesFiltrados = [...this.clientes];
    this.itemsFiltrados    = [...this.items];

    this.form = this.fb.group({
      clienteId:             [null, Validators.required],
      tipoComprobanteId:     [null, Validators.required],
      puntoVenta:            [this.PUNTO_VENTA],
      concepto:              [3],
      forzarNoDiscriminarIVA:[false],
      fechaVencimientoPago:  [this.hoy(), Validators.required],
      fechaServicioDesde:    [this.hoy()],
      fechaServicioHasta:    [this.hoy()],
      detalles: this.fb.array<FormGroup>([])
    });

    this.agregarLinea();

    this.filtroClientesCtrl.valueChanges.subscribe(v => {
      const f = (v || '').toLowerCase();
      this.clientesFiltrados = this.clientes.filter(c => c.razonSocial.toLowerCase().includes(f));
    });

    this.filtroItemsCtrl.valueChanges.subscribe(v => {
      const f = (v || '').toLowerCase();
      this.itemsFiltrados = this.items.filter(i =>
        i.codigo.toLowerCase().includes(f) || i.descripcion.toLowerCase().includes(f)
      );
    });

    this.form.get('clienteId')?.valueChanges.subscribe(id => {
      this.clienteSeleccionado = this.clientes.find(c => c.id === id) || null;
      this.actualizarTipoComprobante();
      this.recalcularVisuales();
    });

    this.form.get('forzarNoDiscriminarIVA')?.valueChanges.subscribe(() => this.recalcularVisuales());
  }

  private hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  get detalles(): FormArray<FormGroup> {
    return this.form.get('detalles') as FormArray<FormGroup>;
  }

  get discriminaIVA(): boolean {
    const esRI = this.clienteSeleccionado?.condicionIvaId === 1;
    const forzarNo = this.form.get('forzarNoDiscriminarIVA')?.value === true;
    return esRI && !forzarNo;
  }

  get puedeEmitirSinDiscriminar(): boolean {
    const id = this.clienteSeleccionado?.condicionIvaId;
    return id === 1 || id === 2;
  }

  get requiereFechasServicio(): boolean {
    return this.form.get('concepto')?.value !== 1;
  }

  actualizarTipoComprobante() {
    if (!this.clienteSeleccionado) return;
    const id = this.clienteSeleccionado.condicionIvaId;
    const tipoId = id === 1 ? 1 : 3;
    this.form.get('tipoComprobanteId')?.setValue(tipoId, { emitEvent: false });
  }

  nuevaLinea(): FormGroup {
    return this.fb.group({
      itemId:           [null, Validators.required],
      cantidad:         [1, [Validators.required, Validators.min(1)]],
      precioUnitario:   [0],
      precioVisual:     [''],
      esServicio:       [false],
      observaciones:    ['']
    });
  }

  agregarLinea() {
    this.detalles.push(this.nuevaLinea());
  }

  quitarLinea(i: number) {
    if (this.detalles.length > 1) this.detalles.removeAt(i);
  }

  onItemChange(i: number) {
    const ctrl = this.detalles.at(i);
    const itemId = Number(ctrl.get('itemId')?.value);
    if (!itemId) return;

    const item = this.items.find(x => x.id === itemId);
    if (!item) return;

    ctrl.patchValue({ esServicio: item.esServicio });

    const esRI = this.clienteSeleccionado?.condicionIvaId === 1;
    const base = esRI ? +(item.precioBase * 0.85).toFixed(2) : item.precioBase;

    ctrl.patchValue({
      precioUnitario: base,
      precioVisual: this.discriminaIVA
        ? base.toFixed(2)
        : (base * (1 + this.IVA)).toFixed(2)
    });
  }

  onPrecioInput(ctrl: FormGroup) {
    let val = (ctrl.get('precioVisual')?.value?.toString() ?? '').replace(',', '.').replace(/[^0-9.]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
    ctrl.get('precioVisual')?.setValue(val, { emitEvent: false });

    const visual = Number(val);
    if (!isNaN(visual)) {
      const base = this.discriminaIVA ? visual : visual / (1 + this.IVA);
      ctrl.get('precioUnitario')?.setValue(+base.toFixed(2), { emitEvent: false });
    }
  }

  subtotalVisual(ctrl: FormGroup): number {
    const qty  = Number(ctrl.get('cantidad')?.value || 0);
    const base = Number(ctrl.get('precioUnitario')?.value || 0);
    const sub  = qty * base;
    return this.discriminaIVA ? sub : sub * (1 + this.IVA);
  }

  get subtotal(): number {
    return this.detalles.controls.reduce((acc, ctrl) => {
      return acc + Number(ctrl.get('cantidad')?.value || 0) * Number(ctrl.get('precioUnitario')?.value || 0);
    }, 0);
  }

  get iva(): number {
    return this.discriminaIVA ? this.subtotal * this.IVA : 0;
  }

  get totalFinal(): number {
    return this.discriminaIVA ? this.subtotal + this.iva : this.subtotal * (1 + this.IVA);
  }

  private recalcularVisuales() {
    this.detalles.controls.forEach(ctrl => {
      const base = Number(ctrl.get('precioUnitario')?.value || 0);
      if (!base) return;
      const visual = this.discriminaIVA ? base : base * (1 + this.IVA);
      ctrl.get('precioVisual')?.setValue(visual.toFixed(2), { emitEvent: false });
    });
  }

  guardar() {
    if (this.form.invalid || this.detalles.length === 0) return;
    if (!this.clienteSeleccionado) return;

    this.guardando = true;

    const v = this.form.value;
    const tipo = this.tiposComprobante.find(t => t.id === v.tipoComprobanteId)!;

    const payload: Omit<Factura, 'id' | 'numeroComprobante' | 'cae' | 'autorizadaEnARCA'> = {
      clienteNombre:           this.clienteSeleccionado.razonSocial,
      tipoComprobanteNombre:   tipo.nombre,
      codigoAfipComprobante:   tipo.codigoAfip,
      puntoVenta:              this.PUNTO_VENTA,
      fechaEmision:            new Date(),
      total:                   +this.totalFinal.toFixed(2)
    };

    setTimeout(() => {
      this.guardando = false;
      this.emitida.emit(payload);
    }, 1600);
  }

  cancelar() { this.cancelado.emit(); }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.ctrlKey && e.code === 'Space') { e.preventDefault(); this.agregarLinea(); }
    if (e.key === 'Escape') this.cancelar();
  }
}
