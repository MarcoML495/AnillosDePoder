import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { DetalleRaza } from './raza/detalle-raza/detalle-raza';
import { CrearAnillo} from './anillo/crear-anillo/crear-anillo';
import { Busqueda } from './anillo/busqueda/busqueda';

export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'crear', component: CrearAnillo},
    { path: 'raza', component: DetalleRaza},
    { path: 'buscar', component: Busqueda },
];
