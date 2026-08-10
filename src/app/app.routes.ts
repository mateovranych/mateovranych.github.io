import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PortfolioLayout } from './portfolio-layout/portfolio-layout';

export const routes: Routes = [

    {
        path: '',
        component: PortfolioLayout,
        children: [
            { path: '', component: Home }
        ]
    },

    {
        path: 'agenda',
        loadComponent: () => import('./pages/agenda/agenda').then(m => m.Agenda)
    },

    {
        path: 'gestion',
        loadComponent: () => import('./pages/gestion/gestion').then(m => m.GestionComponent)
    },

    {
        path: 'facturacion',
        loadComponent: () => import('./pages/facturacion/facturacion').then(m => m.Facturacion)
    },

    {
        path: 'retail',
        loadComponent: () => import('./pages/retail/retail').then(m => m.Retail)
    },

    {
        path: 'ecommerce',
        loadComponent: () => import('./pages/ecommerce/ecommerce').then(m => m.Ecommerce)
    },

    {
        path: '**',
        redirectTo: ''
    }

];
