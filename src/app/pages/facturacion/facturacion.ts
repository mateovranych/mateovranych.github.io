import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FacturacionDialog } from './facturacion-dialog/facturacion-dialog';
import { DemoHeaderComponent } from '../../components/demo-header/demo-header';

export interface Factura {
  id: number;
  clienteNombre: string;
  tipoComprobanteNombre: string;
  codigoAfipComprobante: number;
  puntoVenta: number;
  numeroComprobante: number;
  fechaEmision: Date;
  total: number;
  cae: string | null;
  autorizadaEnARCA: boolean;
  arcaMensajeError?: string;
}

export interface FacturaPayload {
  clienteNombre: string;
  tipoComprobanteNombre: string;
  codigoAfipComprobante: number;
  puntoVenta: number;
  fechaEmision: Date;
  total: number;
}

export interface Categoria { id: number; nombre: string; }
export interface UnidadMedida { id: number; nombre: string; }

export interface Proveedor { id: number; razonSocial: string; }

export interface Producto {
  id: number;
  codigo: string;
  descripcion: string;
  esServicio: boolean;
  categoriaNombre: string;
  categoriaId: number | null;
  unidadMedidaNombre: string;
  unidadMedidaId: number;
  unidadBaseId: number;
  factorConversion: number;
  proveedorId: number;
  proveedorNombre: string;
  requiereFrio: boolean;
  habilitado: boolean;
}

export interface ListaDetalle {
  key: string;
  nombre: string;
  porcentaje: number;
  precio: number;
}

export interface ItemPrecio {
  id: number;
  codigo: string;
  descripcion: string;
  precioVenta: number;
  listasDetalle: ListaDetalle[];
  _highlight: boolean;
}

@Pipe({ name: 'countAutorizadas', standalone: true })
export class CountAutorizadasPipe implements PipeTransform {
  transform(f: Factura[]): number { return f.filter(x => x.autorizadaEnARCA).length; }
}

@Pipe({ name: 'countPendientes', standalone: true })
export class CountPendientesPipe implements PipeTransform {
  transform(f: Factura[]): number { return f.filter(x => !x.autorizadaEnARCA).length; }
}

@Pipe({ name: 'sumTotal', standalone: true })
export class SumTotalPipe implements PipeTransform {
  transform(f: Factura[]): number { return f.reduce((s, x) => s + x.total, 0); }
}

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [CommonModule, FormsModule, FacturacionDialog,
    CountAutorizadasPipe, CountPendientesPipe, SumTotalPipe, DemoHeaderComponent
  ],
  templateUrl: './facturacion.html',
  styleUrl: './facturacion.scss'
})
export class Facturacion implements OnInit {

  vistaActiva: 'facturas' | 'productos' | 'precios' = 'facturas';

  facturas: Factura[] = [];
  facturasFiltradas: Factura[] = [];
  filtro = '';
  cargando = false;
  mostrarDialog = false;
  reintentandoId: number | null = null;
  private idCounter = 5;
  private numeroCounter: { [tipo: number]: number } = { 1: 3, 6: 1, 11: 1 };

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroProd = '';
  cargandoProd = false;

  modalProdAbierto = false;
  modoModal: 'crear' | 'editar' = 'crear';
  prodEditando: Producto | null = null;
  prodForm: Partial<Producto> = {};
  guardandoProd = false;
  confirmEliminarProdId: number | null = null;

  categorias: Categoria[] = [
    { id: 1, nombre: 'Lácteos' }, { id: 2, nombre: 'Carnes' },
    { id: 3, nombre: 'Verduras' }, { id: 4, nombre: 'Limpieza' },
    { id: 5, nombre: 'Bebidas' }, { id: 6, nombre: 'Panadería' },
  ];

  unidades: UnidadMedida[] = [
    { id: 1, nombre: 'Unidad' }, { id: 2, nombre: 'Kg' },
    { id: 3, nombre: 'Litro' }, { id: 4, nombre: 'Caja' },
    { id: 5, nombre: 'Bolsa' }, { id: 6, nombre: 'Docena' },
  ];

  proveedores: Proveedor[] = [
    { id: 1, razonSocial: 'Lácteos del Norte S.A.' },
    { id: 2, razonSocial: 'Distribuidora Pérez' },
    { id: 3, razonSocial: 'Frigorífico Central' },
    { id: 4, razonSocial: 'Proveedora Sur S.R.L.' },
  ];

  itemsPrecios: ItemPrecio[] = [];
  itemsPreciosFiltrados: ItemPrecio[] = [];
  itemsPreciosPagina: ItemPrecio[] = [];

  filtroPrecio = '';
  filtroMinCosto: number | null = null;
  filtroMaxCosto: number | null = null;

  ordenColumna = 'codigo';
  ordenAsc = true;

  pageSize = 10;
  pageIndex = 0;
  totalPaginas = 1;

  listas = [
    { nombre: 'LISTA A', key: 'listaA' },
    { nombre: 'LISTA B', key: 'listaB' },
    { nombre: 'LISTA C', key: 'listaC' },
  ];

  private valorAnterior = new WeakMap<any, Record<string, number>>();

  toastMsg = '';
  toastTipo = '';
  toastVisible = false;
  private _toastTimer: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initFacturas();
    this.initProductos();
    this.initPrecios();
  }

  goBack() { this.router.navigate(['/']); }

  cambiarVista(v: 'facturas' | 'productos' | 'precios') {
    this.vistaActiva = v;
  }

  private initFacturas() {
    this.cargando = true;
    setTimeout(() => {
      this.facturas = [
        { id: 1, clienteNombre: 'Distribuidora El Progreso S.A.', tipoComprobanteNombre: 'Factura A', codigoAfipComprobante: 1,  puntoVenta: 10, numeroComprobante: 1, fechaEmision: new Date('2025-03-01'), total: 84700.00,   cae: '74123456789012', autorizadaEnARCA: true },
        { id: 2, clienteNombre: 'Comercio Rodriguez',             tipoComprobanteNombre: 'Factura C', codigoAfipComprobante: 11, puntoVenta: 10, numeroComprobante: 1, fechaEmision: new Date('2025-03-03'), total: 15200.00,   cae: '74987654321098', autorizadaEnARCA: true },
        { id: 3, clienteNombre: 'Supermercado Norte S.R.L.',      tipoComprobanteNombre: 'Factura A', codigoAfipComprobante: 1,  puntoVenta: 10, numeroComprobante: 2, fechaEmision: new Date('2025-03-05'), total: 220480.50,  cae: '74555123456789', autorizadaEnARCA: true },
        { id: 4, clienteNombre: 'Ferreteria Lopez',               tipoComprobanteNombre: 'Factura B', codigoAfipComprobante: 6,  puntoVenta: 10, numeroComprobante: 1, fechaEmision: new Date('2025-03-07'), total: 8450.00,    cae: null,             autorizadaEnARCA: false, arcaMensajeError: 'Timeout al conectar con ARCA.' },
        { id: 5, clienteNombre: 'Mayorista del Centro S.A.',      tipoComprobanteNombre: 'Factura A', codigoAfipComprobante: 1,  puntoVenta: 10, numeroComprobante: 3, fechaEmision: new Date('2025-03-10'), total: 312000.00,  cae: '74888999000111', autorizadaEnARCA: true },
      ];
      this.facturasFiltradas = [...this.facturas];
      this.cargando = false;
    }, 700);
  }

  aplicarFiltro() {
    const f = this.filtro.toLowerCase().trim();
    if (!f) { this.facturasFiltradas = [...this.facturas]; return; }
    this.facturasFiltradas = this.facturas.filter(x =>
      x.id.toString().includes(f) ||
      x.clienteNombre.toLowerCase().includes(f) ||
      x.tipoComprobanteNombre.toLowerCase().includes(f) ||
      x.numeroComprobante.toString().includes(f) ||
      (x.cae ?? '').includes(f) ||
      new Date(x.fechaEmision).toLocaleDateString('es-AR').includes(f)
    );
  }

  abrirDialogNuevo() { this.mostrarDialog = true; }

  onFacturaEmitida(factura: FacturaPayload) {
    this.mostrarDialog = false;
    this.cargando = true;
    setTimeout(() => {
      const cod = factura.codigoAfipComprobante;
      this.numeroCounter[cod] = (this.numeroCounter[cod] || 0) + 1;
      const exito = Math.random() > 0.15;
      const nueva: Factura = {
        ...factura, id: ++this.idCounter,
        numeroComprobante: this.numeroCounter[cod],
        fechaEmision: new Date(),
        cae: exito ? this.generarCAE() : null,
        autorizadaEnARCA: exito,
        arcaMensajeError: exito ? undefined : 'Servicio ARCA no disponible momentaneamente.'
      };
      this.facturas.unshift(nueva);
      this.aplicarFiltro();
      this.cargando = false;
      if (exito) this.toast('autorizada', 'Factura autorizada. CAE: ' + nueva.cae);
      else this.toast('pendiente', 'ARCA no autorizó. Podés reintentar desde la tabla.');
    }, 1800);
  }

  onDialogCancelado() { this.mostrarDialog = false; }

  reintentarAutorizacion(f: Factura) {
    this.reintentandoId = f.id;
    this.cargando = true;
    setTimeout(() => {
      const exito = Math.random() > 0.3;
      f.autorizadaEnARCA = exito;
      f.cae = exito ? this.generarCAE() : null;
      f.arcaMensajeError = exito ? undefined : 'ARCA sigue sin responder.';
      this.reintentandoId = null;
      this.cargando = false;
      this.aplicarFiltro();
      if (exito) this.toast('autorizada', 'Autorizada! CAE: ' + f.cae);
      else this.toast('error', 'ARCA no autorizó nuevamente.');
    }, 1500);
  }

  eliminarFactura(f: Factura) {
    if (!confirm('Eliminar factura #' + f.id + '?')) return;
    this.facturas = this.facturas.filter(x => x.id !== f.id);
    this.aplicarFiltro();
    this.toast('eliminada', 'Factura eliminada');
  }

  private generarCAE(): string {
    return '7' + Array.from({ length: 13 }, () => Math.floor(Math.random() * 10)).join('');
  }

  private initProductos() {
    this.productos = [
      { id: 1,  codigo: 'LAC-001', descripcion: 'Leche entera 1L x12',          esServicio: false, categoriaNombre: 'Lácteos',   categoriaId: 1, unidadMedidaNombre: 'Caja',   unidadMedidaId: 4, unidadBaseId: 3, factorConversion: 12, proveedorId: 1, proveedorNombre: 'Lácteos del Norte S.A.',  requiereFrio: true,  habilitado: true  },
      { id: 2,  codigo: 'LAC-002', descripcion: 'Yogur firme x6',                esServicio: false, categoriaNombre: 'Lácteos',   categoriaId: 1, unidadMedidaNombre: 'Caja',   unidadMedidaId: 4, unidadBaseId: 1, factorConversion: 6,  proveedorId: 1, proveedorNombre: 'Lácteos del Norte S.A.',  requiereFrio: true,  habilitado: true  },
      { id: 3,  codigo: 'CAR-001', descripcion: 'Pollo entero kg',               esServicio: false, categoriaNombre: 'Carnes',    categoriaId: 2, unidadMedidaNombre: 'Kg',     unidadMedidaId: 2, unidadBaseId: 2, factorConversion: 1,  proveedorId: 3, proveedorNombre: 'Frigorífico Central',      requiereFrio: true,  habilitado: true  },
      { id: 4,  codigo: 'CAR-002', descripcion: 'Asado tira kg',                 esServicio: false, categoriaNombre: 'Carnes',    categoriaId: 2, unidadMedidaNombre: 'Kg',     unidadMedidaId: 2, unidadBaseId: 2, factorConversion: 1,  proveedorId: 3, proveedorNombre: 'Frigorífico Central',      requiereFrio: true,  habilitado: true  },
      { id: 5,  codigo: 'BEB-001', descripcion: 'Agua mineral 500ml x24',        esServicio: false, categoriaNombre: 'Bebidas',   categoriaId: 5, unidadMedidaNombre: 'Caja',   unidadMedidaId: 4, unidadBaseId: 3, factorConversion: 24, proveedorId: 4, proveedorNombre: 'Proveedora Sur S.R.L.',    requiereFrio: false, habilitado: true  },
      { id: 6,  codigo: 'BEB-002', descripcion: 'Gaseosa 2.25L x6',              esServicio: false, categoriaNombre: 'Bebidas',   categoriaId: 5, unidadMedidaNombre: 'Caja',   unidadMedidaId: 4, unidadBaseId: 3, factorConversion: 6,  proveedorId: 4, proveedorNombre: 'Proveedora Sur S.R.L.',    requiereFrio: false, habilitado: true  },
      { id: 7,  codigo: 'LIM-001', descripcion: 'Detergente 500ml x12',          esServicio: false, categoriaNombre: 'Limpieza',  categoriaId: 4, unidadMedidaNombre: 'Caja',   unidadMedidaId: 4, unidadBaseId: 1, factorConversion: 12, proveedorId: 2, proveedorNombre: 'Distribuidora Pérez',     requiereFrio: false, habilitado: true  },
      { id: 8,  codigo: 'LIM-002', descripcion: 'Lavandina 1L x12',              esServicio: false, categoriaNombre: 'Limpieza',  categoriaId: 4, unidadMedidaNombre: 'Caja',   unidadMedidaId: 4, unidadBaseId: 3, factorConversion: 12, proveedorId: 2, proveedorNombre: 'Distribuidora Pérez',     requiereFrio: false, habilitado: false },
      { id: 9,  codigo: 'PAN-001', descripcion: 'Pan lactal grande',              esServicio: false, categoriaNombre: 'Panadería', categoriaId: 6, unidadMedidaNombre: 'Unidad', unidadMedidaId: 1, unidadBaseId: 1, factorConversion: 1,  proveedorId: 2, proveedorNombre: 'Distribuidora Pérez',     requiereFrio: false, habilitado: true  },
      { id: 10, codigo: 'SRV-001', descripcion: 'Flete distribución zona norte',  esServicio: true,  categoriaNombre: '-',         categoriaId: null, unidadMedidaNombre: 'Unidad', unidadMedidaId: 1, unidadBaseId: 1, factorConversion: 1, proveedorId: 4, proveedorNombre: 'Proveedora Sur S.R.L.', requiereFrio: false, habilitado: true  },
    ];
    this.productosFiltrados = [...this.productos];
  }

  aplicarFiltroProd() {
    const t = this.filtroProd.toLowerCase().trim();
    this.productosFiltrados = this.productos.filter(p =>
      p.codigo.toLowerCase().includes(t) ||
      p.descripcion.toLowerCase().includes(t) ||
      p.categoriaNombre.toLowerCase().includes(t)
    );
  }

  abrirModalCrearProd() {
    this.modoModal = 'crear';
    this.prodEditando = null;
    this.prodForm = { codigo: '', descripcion: '', esServicio: false, categoriaId: 1, unidadMedidaId: 1, unidadBaseId: 1, factorConversion: 1, proveedorId: 1, requiereFrio: false, habilitado: true };
    this.modalProdAbierto = true;
  }

  abrirModalEditarProd(p: Producto) {
    this.modoModal = 'editar';
    this.prodEditando = p;
    this.prodForm = { ...p };
    this.modalProdAbierto = true;
  }

  cerrarModalProd() { this.modalProdAbierto = false; }

  guardarProducto() {
    if (!this.prodForm.codigo?.trim() || !this.prodForm.descripcion?.trim()) return;
    this.guardandoProd = true;
    setTimeout(() => {
      const cat  = this.categorias.find(c => c.id === this.prodForm.categoriaId);
      const uni  = this.unidades.find(u => u.id === this.prodForm.unidadMedidaId);
      const prov = this.proveedores.find(p => p.id === this.prodForm.proveedorId);

      if (this.modoModal === 'editar' && this.prodEditando) {
        const idx = this.productos.findIndex(p => p.id === this.prodEditando!.id);
        if (idx > -1) {
          this.productos[idx] = {
            ...this.prodEditando, ...this.prodForm,
            categoriaNombre: cat?.nombre ?? '-',
            unidadMedidaNombre: uni?.nombre ?? '-',
            proveedorNombre: prov?.razonSocial ?? '-',
          } as Producto;
        }
        this.toast('autorizada', 'Producto actualizado');
      } else {
        const newId = Math.max(...this.productos.map(p => p.id)) + 1;
        this.productos.push({
          ...this.prodForm, id: newId,
          categoriaNombre: cat?.nombre ?? '-',
          unidadMedidaNombre: uni?.nombre ?? '-',
          proveedorNombre: prov?.razonSocial ?? '-',
        } as Producto);
        this.toast('autorizada', 'Producto creado');
      }
      this.aplicarFiltroProd();
      this.guardandoProd = false;
      this.cerrarModalProd();
    }, 600);
  }

  confirmarEliminarProd(id: number) { this.confirmEliminarProdId = id; }
  cancelarEliminarProd()            { this.confirmEliminarProdId = null; }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.aplicarFiltroProd();
    this.confirmEliminarProdId = null;
    this.toast('eliminada', 'Producto eliminado');
  }

  toggleHabilitado(p: Producto) {
    p.habilitado = !p.habilitado;
    this.toast('autorizada', `Producto ${p.habilitado ? 'habilitado' : 'deshabilitado'}`);
  }

  private initPrecios() {
    const base = [
      { codigo: 'LAC-001', descripcion: 'Leche entera 1L x12',          costo: 8500,  pctA: 35, pctB: 45, pctC: 55 },
      { codigo: 'LAC-002', descripcion: 'Yogur firme x6',                costo: 5200,  pctA: 30, pctB: 42, pctC: 50 },
      { codigo: 'CAR-001', descripcion: 'Pollo entero kg',               costo: 3200,  pctA: 28, pctB: 38, pctC: 48 },
      { codigo: 'CAR-002', descripcion: 'Asado tira kg',                 costo: 7800,  pctA: 25, pctB: 35, pctC: 45 },
      { codigo: 'BEB-001', descripcion: 'Agua mineral 500ml x24',        costo: 4100,  pctA: 40, pctB: 52, pctC: 65 },
      { codigo: 'BEB-002', descripcion: 'Gaseosa 2.25L x6',              costo: 6300,  pctA: 38, pctB: 50, pctC: 62 },
      { codigo: 'LIM-001', descripcion: 'Detergente 500ml x12',          costo: 7200,  pctA: 42, pctB: 55, pctC: 70 },
      { codigo: 'LIM-002', descripcion: 'Lavandina 1L x12',              costo: 4800,  pctA: 40, pctB: 52, pctC: 65 },
      { codigo: 'PAN-001', descripcion: 'Pan lactal grande',              costo: 1800,  pctA: 45, pctB: 58, pctC: 72 },
      { codigo: 'SRV-001', descripcion: 'Flete distribución zona norte',  costo: 15000, pctA: 20, pctB: 30, pctC: 40 },
    ];

    this.itemsPrecios = base.map((b, i) => ({
      id: i + 1, codigo: b.codigo, descripcion: b.descripcion,
      precioVenta: b.costo, _highlight: false,
      listasDetalle: [
        { key: 'listaA', nombre: 'LISTA A', porcentaje: b.pctA, precio: b.costo * (1 + b.pctA / 100) },
        { key: 'listaB', nombre: 'LISTA B', porcentaje: b.pctB, precio: b.costo * (1 + b.pctB / 100) },
        { key: 'listaC', nombre: 'LISTA C', porcentaje: b.pctC, precio: b.costo * (1 + b.pctC / 100) },
      ]
    }));

    this.aplicarFiltrosPrecios();
  }

  aplicarFiltrosPrecios() {
    const t = this.filtroPrecio.trim().toLowerCase();
    let lista = [...this.itemsPrecios];

    if (t) lista = lista.filter(i =>
      i.codigo.toLowerCase().includes(t) || i.descripcion.toLowerCase().includes(t)
    );
    if (this.filtroMinCosto !== null && !isNaN(this.filtroMinCosto))
      lista = lista.filter(i => i.precioVenta >= this.filtroMinCosto!);
    if (this.filtroMaxCosto !== null && !isNaN(this.filtroMaxCosto))
      lista = lista.filter(i => i.precioVenta <= this.filtroMaxCosto!);

    const col = this.ordenColumna;
    lista.sort((a: any, b: any) => {
      const cmp = String(a[col] ?? '').localeCompare(String(b[col] ?? ''), undefined, { numeric: true, sensitivity: 'base' });
      return this.ordenAsc ? cmp : -cmp;
    });

    this.itemsPreciosFiltrados = lista;
    this.actualizarPaginaPrecios();
  }

  actualizarPaginaPrecios() {
    this.pageSize = Number(this.pageSize) || 10;
    const total = this.itemsPreciosFiltrados.length;
    this.totalPaginas = Math.max(1, Math.ceil(total / this.pageSize));
    if (this.pageIndex >= this.totalPaginas) this.pageIndex = this.totalPaginas - 1;
    if (this.pageIndex < 0) this.pageIndex = 0;
    const start = this.pageIndex * this.pageSize;
    this.itemsPreciosPagina = this.itemsPreciosFiltrados.slice(start, start + this.pageSize);
  }

  ordenarPrecios(col: string) {
    if (this.ordenColumna === col) this.ordenAsc = !this.ordenAsc;
    else { this.ordenColumna = col; this.ordenAsc = true; }
    this.aplicarFiltrosPrecios();
  }

  paginaAnterior() {
    if (this.pageIndex > 0) { this.pageIndex--; this.actualizarPaginaPrecios(); }
  }

  paginaSiguiente() {
    if (this.pageIndex + 1 < this.totalPaginas) { this.pageIndex++; this.actualizarPaginaPrecios(); }
  }

  cambiarPageSize() { this.pageIndex = 0; this.actualizarPaginaPrecios(); }

  onCostoChange(item: ItemPrecio) {
    for (const l of item.listasDetalle) l.precio = item.precioVenta * (1 + l.porcentaje / 100);
    this.flashRow(item);
  }

  onPorcentajeChange(item: ItemPrecio, lista: ListaDetalle) {
    lista.precio = item.precioVenta * (1 + lista.porcentaje / 100);
    this.flashRow(item);
  }

  onFocusNumero(obj: any, campo: string) {
    if (!this.valorAnterior.has(obj)) this.valorAnterior.set(obj, {});
    this.valorAnterior.get(obj)![campo] = obj[campo];
  }

  onEscapeNumero(obj: any, campo: string) {
    const original = this.valorAnterior.get(obj)?.[campo];
    if (original !== undefined) obj[campo] = original;
  }

  onKeyDownNumero(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') event.preventDefault();
  }

  private flashRow(item: ItemPrecio) {
    item._highlight = true;
    setTimeout(() => item._highlight = false, 600);
  }

  formatPrecio(n: number): string {
    return n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }


  toast(tipo: string, msg: string) {
    this.toastTipo = tipo;
    this.toastMsg = msg;
    this.toastVisible = true;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.toastVisible = false, 3500);
  }
}
