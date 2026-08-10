import {
  Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DemoHeaderComponent } from '../../components/demo-header/demo-header';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precioVenta: number;
  stock: number;
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

interface MetodoPago {
  id: number;
  nombre: string;
  icono: string;
}

type ModalTipo = 'pago' | 'caja-abrir' | 'retiro' | 'ticket' | null;

@Component({
  selector: 'app-retail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DemoHeaderComponent],
  templateUrl: './retail.html',
  styleUrl: './retail.scss'
})
export class Retail implements OnInit, AfterViewInit {

  @ViewChild('searchInputRef') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('tablaRef') tablaRef!: ElementRef<HTMLDivElement>;

  searchControl = new FormControl('');

  private todosProductos: Producto[] = [
    { id:1,  codigo:'7790001', nombre:'Coca-Cola 2.25L',                  categoria:'Bebidas',   precioVenta:1250, stock:48 },
    { id:2,  codigo:'7790002', nombre:'Pepsi 2.25L',                      categoria:'Bebidas',   precioVenta:1180, stock:32 },
    { id:3,  codigo:'7790003', nombre:'Sprite 500ml',                     categoria:'Bebidas',   precioVenta:650,  stock:60 },
    { id:4,  codigo:'7790004', nombre:'Agua Mineral 1.5L',                categoria:'Bebidas',   precioVenta:400,  stock:100 },
    { id:5,  codigo:'7790005', nombre:'Jugo Cepita Naranja 1L',           categoria:'Bebidas',   precioVenta:850,  stock:25 },
    { id:6,  codigo:'7790006', nombre:'Leche Entera La Serenisima 1L',    categoria:'Lacteos',   precioVenta:820,  stock:40 },
    { id:7,  codigo:'7790007', nombre:'Yogur Ser Frutilla 190g',          categoria:'Lacteos',   precioVenta:450,  stock:30 },
    { id:8,  codigo:'7790008', nombre:'Queso Cremoso 300g',               categoria:'Lacteos',   precioVenta:1650, stock:15 },
    { id:9,  codigo:'7790009', nombre:'Manteca Sancor 200g',              categoria:'Lacteos',   precioVenta:920,  stock:22 },
    { id:10, codigo:'7790010', nombre:'Pan Lactal Bimbo 550g',            categoria:'Panaderia', precioVenta:780,  stock:18 },
    { id:11, codigo:'7790011', nombre:'Facturas x6',                      categoria:'Panaderia', precioVenta:1200, stock:10 },
    { id:12, codigo:'7790012', nombre:'Medialunas x6',                    categoria:'Panaderia', precioVenta:1100, stock:8  },
    { id:13, codigo:'7790013', nombre:'Fideos Don Victorio 500g',         categoria:'Almacen',   precioVenta:560,  stock:55 },
    { id:14, codigo:'7790014', nombre:'Arroz Gallo Oro 1kg',              categoria:'Almacen',   precioVenta:680,  stock:42 },
    { id:15, codigo:'7790015', nombre:'Aceite Cocinero 900ml',            categoria:'Almacen',   precioVenta:1450, stock:28 },
    { id:16, codigo:'7790016', nombre:'Azucar Ledesma 1kg',               categoria:'Almacen',   precioVenta:590,  stock:35 },
    { id:17, codigo:'7790017', nombre:'Harina 000 Pureza 1kg',            categoria:'Almacen',   precioVenta:540,  stock:44 },
    { id:18, codigo:'7790018', nombre:'Tomate perita La Campagnola 400g', categoria:'Almacen',   precioVenta:480,  stock:60 },
    { id:19, codigo:'7790019', nombre:'Galletitas Oreo 144g',             categoria:'Snacks',    precioVenta:750,  stock:50 },
    { id:20, codigo:'7790020', nombre:'Papas Fritas Lays 120g',           categoria:'Snacks',    precioVenta:680,  stock:38 },
    { id:21, codigo:'7790021', nombre:'Alfajor Milka Triple',             categoria:'Snacks',    precioVenta:450,  stock:65 },
    { id:22, codigo:'7790022', nombre:'Chocolate Aguila 100g',            categoria:'Snacks',    precioVenta:550,  stock:20 },
    { id:23, codigo:'7790023', nombre:'Detergente Magistral 750ml',       categoria:'Limpieza',  precioVenta:890,  stock:30 },
    { id:24, codigo:'7790024', nombre:'Lavandina Ayudin 1L',              categoria:'Limpieza',  precioVenta:480,  stock:25 },
    { id:25, codigo:'7790025', nombre:'Jabon en polvo Ala 500g',          categoria:'Limpieza',  precioVenta:760,  stock:18 },
    { id:26, codigo:'7790026', nombre:'Papel higienico Higienol x4',      categoria:'Limpieza',  precioVenta:920,  stock:40 },
    { id:27, codigo:'7790027', nombre:'Shampoo Pantene 400ml',            categoria:'Cuidado',   precioVenta:1350, stock:12 },
    { id:28, codigo:'7790028', nombre:'Desodorante Rexona Men',           categoria:'Cuidado',   precioVenta:980,  stock:20 },
    { id:29, codigo:'7790029', nombre:'Jabon Dove 90g',                   categoria:'Cuidado',   precioVenta:350,  stock:0  },
    { id:30, codigo:'7790030', nombre:'Crema Nivea 200ml',                categoria:'Cuidado',   precioVenta:1100, stock:4  },
  ];

  categorias: string[] = [];
  categoriaActiva = 'Todos';
  productosFiltrados: Producto[] = [];
  productosMostrados: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  private bloque = 30;
  private indice = 0;

  metodosPago: MetodoPago[] = [
    { id: 1, nombre: 'Efectivo',      icono: '💵' },
    { id: 2, nombre: 'Debito',        icono: '💳' },
    { id: 3, nombre: 'Credito',       icono: '🏦' },
    { id: 4, nombre: 'Mercado Pago',  icono: '📱' },
    { id: 5, nombre: 'Transferencia', icono: '🔁' },
    { id: 6, nombre: 'QR',            icono: '🔲' },
  ];

  carrito: CarritoItem[] = [];
  cajaAbierta = false;
  modal: ModalTipo = null;

  montoCaja = 0;
  retiroMonto = 0;
  retiroMotivo = '';
  metodoPagoSeleccionado: number | null = null;
  efectivoRecibido = 0;
  vuelto = 0;

  ticketItems: CarritoItem[] = [];
  ticketTotal = 0;
  ticketMetodo = '';
  ticketVuelto = 0;
  ticketFecha = '';
  ventaNum = 0;

  toastMsg = '';
  toastVisible = false;
  private _toastTimer: any;

  get total(): number {
    return +this.carrito.reduce((s, i) => s + i.producto.precioVenta * i.cantidad, 0).toFixed(2);
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.categorias = ['Todos', ...new Set(this.todosProductos.map(p => p.categoria))];
    this.productosFiltrados = [...this.todosProductos];
    this.cargarMas();

    this.searchControl.valueChanges.subscribe(term => {
      const v = term?.toLowerCase() || '';
      this.productosFiltrados = this.todosProductos.filter(p =>
        (this.categoriaActiva === 'Todos' || p.categoria === this.categoriaActiva) &&
        (p.nombre.toLowerCase().includes(v) || p.codigo.includes(v))
      );
      this.productosMostrados = [...this.productosFiltrados];
      this.indice = this.productosMostrados.length;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.searchInputRef?.nativeElement.focus(), 200);
    this.tablaRef?.nativeElement.addEventListener('scroll', () => {
      const el = this.tablaRef.nativeElement;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) this.cargarMas();
    });
  }

  cargarMas() {
    const lote = this.productosFiltrados.slice(this.indice, this.indice + this.bloque);
    this.productosMostrados = [...this.productosMostrados, ...lote];
    this.indice += this.bloque;
  }

  filtrarCategoria(cat: string) {
    this.categoriaActiva = cat;
    this.productosMostrados = [];
    this.indice = 0;
    const term = this.searchControl.value?.toLowerCase() || '';
    this.productosFiltrados = this.todosProductos.filter(p =>
      (cat === 'Todos' || p.categoria === cat) &&
      (p.nombre.toLowerCase().includes(term) || p.codigo.includes(term))
    );
    this.cargarMas();
  }

  seleccionarProducto(p: Producto) {
    if (p.stock === 0) return;
    this.productoSeleccionado = p;
  }

  agregarProducto(p: Producto) {
    if (p.stock === 0) { this.toast('Sin stock'); return; }
    const item = this.carrito.find(i => i.producto.id === p.id);
    if (item) { item.cantidad++; }
    else { this.carrito = [...this.carrito, { producto: { ...p }, cantidad: 1 }]; }
    this.toast(p.nombre + ' agregado al carrito');
  }

  aumentar(item: CarritoItem) { item.cantidad++; }

  disminuir(item: CarritoItem) {
    if (item.cantidad > 1) item.cantidad--;
    else this.eliminar(item);
  }

  eliminar(item: CarritoItem) {
    this.carrito = this.carrito.filter(i => i.producto.id !== item.producto.id);
  }

  limpiar() { this.carrito = []; }

  toggleCaja() {
    if (this.cajaAbierta) {
      this.cajaAbierta = false;
      this.toast('Caja cerrada');
    } else {
      this.modal = 'caja-abrir';
      this.montoCaja = 0;
    }
  }

  confirmarAbrirCaja() {
    this.cajaAbierta = true;
    this.cerrarModal();
    this.toast('Caja abierta con $' + this.montoCaja);
  }

  abrirRetiro() {
    this.modal = 'retiro';
    this.retiroMonto = 0;
    this.retiroMotivo = '';
  }

  confirmarRetiro() {
    this.cerrarModal();
    this.toast('Retiro de $' + this.retiroMonto + ' registrado');
  }

  abrirPago() {
    if (!this.cajaAbierta || this.carrito.length === 0) return;
    this.metodoPagoSeleccionado = null;
    this.efectivoRecibido = 0;
    this.vuelto = 0;
    this.modal = 'pago';
  }

  calcularVuelto() {
    this.vuelto = Math.max(0, +(this.efectivoRecibido - this.total).toFixed(2));
  }

  confirmarVenta() {
    const metodo = this.metodosPago.find(m => m.id === this.metodoPagoSeleccionado)!;
    this.ticketItems = this.carrito.map(i => ({ ...i }));
    this.ticketTotal = this.total;
    this.ticketMetodo = metodo.nombre;
    this.ticketVuelto = this.metodoPagoSeleccionado === 1 ? this.vuelto : 0;
    this.ticketFecha = new Date().toLocaleString('es-AR');
    this.ventaNum++;
    this.carrito = [];
    this.modal = 'ticket';
  }

  cerrarModal() { this.modal = null; }

  @HostListener('window:keydown', ['$event'])
  handleKey(e: KeyboardEvent) {
    if (e.key.length === 1) return;
    if (e.key === 'F2') { e.preventDefault(); this.abrirPago(); }
    if (e.key === 'F4') { e.preventDefault(); this.limpiar(); }
    if (e.key === 'F7') { e.preventDefault(); if (this.cajaAbierta) this.abrirRetiro(); }
    if (e.key === 'Escape') this.cerrarModal();
  }

  toast(msg: string) {
    this.toastMsg = msg;
    this.toastVisible = true;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.toastVisible = false, 2500);
  }

  goBack() { this.router.navigate(['/']); }
}
