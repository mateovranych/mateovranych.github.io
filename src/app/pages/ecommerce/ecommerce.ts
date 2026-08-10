import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DemoHeaderComponent } from '../../components/demo-header/demo-header';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precioOferta?: number;
  categoria: string;
  genero: string;
  descripcion: string;
  destacado: boolean;
  oferta: boolean;
  imagen: string;
  stock: number;
}

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [CommonModule, FormsModule, DemoHeaderComponent],
  templateUrl: './ecommerce.html',
  styleUrl: './ecommerce.scss'
})
export class Ecommerce implements OnInit {

  vista: 'index' | 'admin' = 'index';

  productos: Producto[] = [
    { id: 1,  nombre: 'Remera Oversize Premium',     precio: 18500, precioOferta: 13990, categoria: 'Remeras',    genero: 'Unisex',  descripcion: 'Algodón 100%, corte relajado.',          destacado: true,  oferta: true,  imagen: '#c8b8a2', stock: 15 },
    { id: 2,  nombre: 'Jean Slim Fit Negro',          precio: 45000,                     categoria: 'Pantalones', genero: 'Hombre',  descripcion: 'Denim stretch, cinco bolsillos.',         destacado: true,  oferta: false, imagen: '#2d2d2d', stock: 8  },
    { id: 3,  nombre: 'Vestido Midi Floral',          precio: 32000, precioOferta: 24000, categoria: 'Vestidos',   genero: 'Mujer',   descripcion: 'Tela liviana, estampa exclusiva.',       destacado: false, oferta: true,  imagen: '#d4a5c9', stock: 12 },
    { id: 4,  nombre: 'Campera Bomber Vintage',       precio: 67000,                     categoria: 'Camperas',   genero: 'Unisex',  descripcion: 'Poliéster reciclado, forro satinado.',    destacado: true,  oferta: false, imagen: '#4a6741', stock: 5  },
    { id: 5,  nombre: 'Buzo Canguro Básico',          precio: 28000, precioOferta: 21500, categoria: 'Buzos',      genero: 'Unisex',  descripcion: 'Fleece suave, bolsillo frontal.',         destacado: false, oferta: true,  imagen: '#8b7355', stock: 20 },
    { id: 6,  nombre: 'Falda Plisada Mini',           precio: 22000,                     categoria: 'Faldas',     genero: 'Mujer',   descripcion: 'Poliéster plisado, cintura elástica.',    destacado: false, oferta: false, imagen: '#c9a87c', stock: 9  },
    { id: 7,  nombre: 'Pantalón Cargo Relaxed',       precio: 38000,                     categoria: 'Pantalones', genero: 'Unisex',  descripcion: 'Gabardina, múltiples bolsillos.',         destacado: true,  oferta: false, imagen: '#6b7a5e', stock: 14 },
    { id: 8,  nombre: 'Top Canelón Ajustado',         precio: 12000, precioOferta: 8990,  categoria: 'Tops',       genero: 'Mujer',   descripcion: 'Punto canelón, varios colores.',          destacado: false, oferta: true,  imagen: '#e8c4b8', stock: 25 },
    { id: 9,  nombre: 'Camiseta Lino Manga Larga',    precio: 24000,                     categoria: 'Remeras',    genero: 'Hombre',  descripcion: 'Lino natural, fresca y transpirable.',    destacado: true,  oferta: false, imagen: '#e8dcc8', stock: 11 },
    { id: 10, nombre: 'Short Deportivo Dry-Fit',      precio: 15000, precioOferta: 11000, categoria: 'Shorts',     genero: 'Unisex',  descripcion: 'Tela técnica, bolsillos laterales.',      destacado: false, oferta: true,  imagen: '#3a3a5c', stock: 30 },
    { id: 11, nombre: 'Blazer Structured Negro',      precio: 89000,                     categoria: 'Blazers',    genero: 'Mujer',   descripcion: 'Lana fría, hombreras levemente marcadas.',destacado: true,  oferta: false, imagen: '#1a1a1a', stock: 4  },
    { id: 12, nombre: 'Remera Gráfica Underground',   precio: 19500,                     categoria: 'Remeras',    genero: 'Hombre',  descripcion: 'Algodón pima, serigrafía artesanal.',     destacado: false, oferta: false, imagen: '#e0d5c5', stock: 18 },
  ];

  filtroBusqueda = '';
  filtroCategoria = 'Todas';
  filtroGenero = 'Todos';
  vistaGrid: 'grid' | 'list' = 'grid';
  productoDetalle: Producto | null = null;
  carritoCount = 0;
  toastMsg = '';
  toastVisible = false;
  private toastTimer: any;

  adminAutenticado = false;
  adminUser = '';
  adminPass = '';
  adminLoginError = false;
  busquedaAdmin = '';
  modalProductoAbierto = false;
  productoEditando: Producto | null = null;
  nuevoProducto: Partial<Producto> = {};
  guardandoProducto = false;
  confirmandoEliminar: number | null = null;

  private _v = 0;
  private bumpProductos() { this._v++; }

  private _destV = -1; private _dest: Producto[] = [];
  private _oferV = -1; private _ofer: Producto[] = [];
  private _oferTopV = -1; private _oferTop: Producto[] = [];
  private _catV = -1;  private _cat: string[] = [];
  private _genV = -1;  private _gen: string[] = [];
  private _filtKey = ''; private _filt: Producto[] = [];
  private _admKey = '';  private _adm: Producto[] = [];

  get totalStock(): number {
    return this.productos.reduce((a, p) => a + p.stock, 0);
  }

  get categorias(): string[] {
    if (this._catV !== this._v) {
      this._cat = ['Todas', ...new Set(this.productos.map(p => p.categoria))];
      this._catV = this._v;
    }
    return this._cat;
  }

  get generos(): string[] {
    if (this._genV !== this._v) {
      this._gen = ['Todos', ...new Set(this.productos.map(p => p.genero))];
      this._genV = this._v;
    }
    return this._gen;
  }

  get productosDestacados(): Producto[] {
    if (this._destV !== this._v) {
      this._dest = this.productos.filter(p => p.destacado);
      this._destV = this._v;
    }
    return this._dest;
  }

  get productosOferta(): Producto[] {
    if (this._oferV !== this._v) {
      this._ofer = this.productos.filter(p => p.oferta);
      this._oferV = this._v;
    }
    return this._ofer;
  }

  get productosOfertaTop(): Producto[] {
    if (this._oferTopV !== this._v) {
      this._oferTop = this.productosOferta.slice(0, 4);
      this._oferTopV = this._v;
    }
    return this._oferTop;
  }

  get productosFiltrados(): Producto[] {
    const key = `${this._v}|${this.filtroBusqueda}|${this.filtroCategoria}|${this.filtroGenero}`;
    if (key !== this._filtKey) {
      const q = this.filtroBusqueda.toLowerCase();
      this._filt = this.productos.filter(p => {
        const matchNombre = p.nombre.toLowerCase().includes(q);
        const matchCat = this.filtroCategoria === 'Todas' || p.categoria === this.filtroCategoria;
        const matchGen = this.filtroGenero === 'Todos' || p.genero === this.filtroGenero;
        return matchNombre && matchCat && matchGen;
      });
      this._filtKey = key;
    }
    return this._filt;
  }

  get productosFiltradosAdmin(): Producto[] {
    const key = `${this._v}|${this.busquedaAdmin}`;
    if (key !== this._admKey) {
      const q = this.busquedaAdmin.toLowerCase();
      this._adm = this.productos.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q)
      );
      this._admKey = key;
    }
    return this._adm;
  }

  get descuento(): (p: Producto) => number {
    return (p: Producto) => p.precioOferta
      ? Math.round((1 - p.precioOferta / p.precio) * 100) : 0;
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() { this.router.navigate(['/']); }
  irAdmin() { this.vista = 'admin'; }
  irIndex() { this.vista = 'index'; this.productoDetalle = null; }

  verDetalle(p: Producto) { this.productoDetalle = p; window.scrollTo(0,0); }
  cerrarDetalle() { this.productoDetalle = null; }

  agregarCarrito(p: Producto) {
    this.carritoCount++;
    this.mostrarToast(`"${p.nombre}" agregado al carrito`);
    this.productoDetalle = null;
  }

  mostrarToast(msg: string) {
    this.toastMsg = msg;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastVisible = false, 3000);
  }

  loginAdmin() {
    if (this.adminUser === 'admin' && this.adminPass === '1234') {
      this.adminAutenticado = true;
      this.adminLoginError = false;
    } else {
      this.adminLoginError = true;
    }
  }

  cerrarSesion() {
    this.adminAutenticado = false;
    this.adminUser = '';
    this.adminPass = '';
    this.vista = 'index';
  }

  abrirModalNuevo() {
    this.productoEditando = null;
    this.nuevoProducto = {
      nombre: '', precio: 0, categoria: 'Remeras', genero: 'Unisex',
      descripcion: '', destacado: false, oferta: false,
      imagen: '#c8b8a2', stock: 10
    };
    this.modalProductoAbierto = true;
  }

  abrirModalEditar(p: Producto) {
    this.productoEditando = p;
    this.nuevoProducto = { ...p };
    this.modalProductoAbierto = true;
  }

  cerrarModal() {
    this.modalProductoAbierto = false;
    this.productoEditando = null;
  }

  guardarProducto() {
    if (!this.nuevoProducto.nombre?.trim()) return;
    this.guardandoProducto = true;

    setTimeout(() => {
      if (this.productoEditando) {
        const idx = this.productos.findIndex(p => p.id === this.productoEditando!.id);
        if (idx > -1) this.productos[idx] = { ...this.productoEditando, ...this.nuevoProducto } as Producto;
      } else {
        const newId = Math.max(...this.productos.map(p => p.id)) + 1;
        this.productos.push({ ...this.nuevoProducto, id: newId } as Producto);
      }
      this.bumpProductos();
      this.guardandoProducto = false;
      this.cerrarModal();
    }, 800);
  }

  confirmarEliminar(id: number) { this.confirmandoEliminar = id; }
  cancelarEliminar() { this.confirmandoEliminar = null; }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.bumpProductos();
    this.confirmandoEliminar = null;
  }

  toggleDestacado(p: Producto) { p.destacado = !p.destacado; this.bumpProductos(); }
  toggleOferta(p: Producto)    { p.oferta = !p.oferta; this.bumpProductos(); }

  formatPrecio(n: number): string {
    return `$${n.toLocaleString('es-AR')}`;
  }
}
