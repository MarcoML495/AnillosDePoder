import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { DetalleRaza } from './raza/detalle-raza/detalle-raza';
import { BusquedaRaza } from './raza/busqueda-raza/busqueda-raza';
import { CrearAnillo} from './anillo/crear-anillo/crear-anillo';
import { Busqueda } from './anillo/busqueda/busqueda';
import { BuscarPersonaje } from './personajes/buscar-personaje/buscar-personaje';
import { DetallePersonaje } from './personajes/detalle-personaje/detalle-personaje';

export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'crear', component: CrearAnillo},
    { path: 'raza', component: DetalleRaza},
    { path: 'buscar', component: Busqueda },
    { path: 'buscarraza', component: BusquedaRaza },
    { path: 'personajes', component: BuscarPersonaje },
    { path: 'editar/:id', component: DetallePersonaje },
    { path: 'crearpersonaje', component: DetallePersonaje },
];
