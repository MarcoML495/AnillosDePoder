import { Component } from '@angular/core';
import { Razas } from '../../clases/razas';
import { Raza } from '../../interfaces/raza';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-busqueda-raza',
  imports: [InputTextModule, FloatLabelModule, SelectModule, FormsModule, ButtonModule, CommonModule, TableModule, RouterLink],
  templateUrl: './busqueda-raza.html',
  styleUrl: './busqueda-raza.css',
})
export class BusquedaRaza {
  afinidades = ['Tiene', 'No tiene']

  raza = new Razas()
  razasFiltradas: Raza[] = this.raza.razas

  busquedaNombre: string = '';
  busquedaDescripcion: string = '';
  busquedaLongevidad: string = '';
  busquedaRegion: string = '';

  buscar() {

    const n = this.busquedaNombre.toLowerCase();
    const d = this.busquedaDescripcion.toLowerCase();
    const l = this.busquedaLongevidad.toLowerCase();
    const r = this.busquedaRegion.toLowerCase();

    this.razasFiltradas = this.raza.razas.filter(raza =>
      raza.nombre.toLowerCase().includes(n) &&
      raza.descripcion.toLowerCase().includes(d) &&
      raza.longevidad.toLowerCase().includes(l) &&
      raza.regionPrincipal.toLowerCase().includes(r)
    );

  }
}
