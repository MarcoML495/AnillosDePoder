import { Component } from '@angular/core';
import { Anillos } from '../../clases/anillos';
import { Razas } from '../../clases/razas';
import { Anillo } from '../../interfaces/anillo';
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
  selector: 'app-busqueda',
  imports: [InputTextModule, FloatLabelModule, SelectModule, FormsModule, ButtonModule, CommonModule, TableModule, RouterLink],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {

  anillo = new Anillos()
  raza = new Razas()

  anillosFiltrados: Anillo[] = this.anillo.anillos
  listaRazas: Raza[] = this.raza.razas

  busquedaNombre: string = '';
  busquedaPortador: string = '';
  busquedaRaza: string = '';
  buscar() {

     const n = this.busquedaNombre.toLowerCase();
     const p = this.busquedaPortador.toLowerCase();
     const r = this.busquedaRaza.toLowerCase();

    this.anillosFiltrados = this.anillo.anillos.filter(a =>
      a.nombre.toLowerCase().includes(n) ||
      a.portador.toLowerCase().includes(p) ||
      a.raza.toLowerCase().includes(r)
    );

  }
}
