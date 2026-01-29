import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { AnillosService } from '../../servicios/anillos-service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { PopupConfig } from '../../interfaces/popup-config';
import { PopupConfirmar } from "../../modales/popup-confirmar/popup-confirmar";

@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, CommonModule, TableModule, RouterLink, PopupConfirmar],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit{

  paramsBajaFis:PopupConfig = {
      message:"¿Quieres eliminar a este personaje de la BD?",
      buttonName:"Baja fisica",
      severity:"danger"
    }

  paramsBajaLog:PopupConfig = {
      message:"¿Quieres dar a este personaje de baja?",
      buttonName:"Baja logica",
      severity:"warn"
    }

  paramsReactiv:PopupConfig = {
      message:"¿Quieres reactivar a este personaje?",
      buttonName:"Reactivar",
      severity:"info"
    }

  protected readonly title = signal('anillosDePoder');

  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef, private route: Router) {}

  personajes : any [] = []
  error = ''

  editar(item:any): void {
    this.route.navigate(["/editar",item.id])
  }

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes () {
    this.anilloService.getAllCharacters().subscribe({
      next: data => { this.personajes = data; this.cdr.detectChanges(); },
      error: err => this.error = err,
      complete: () => console.log('Observable emitted the complete notification')
    });
  }
}
