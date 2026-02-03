import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { AnillosService } from '../../servicios/anillos-service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { PopupConfig } from '../../interfaces/popup-config';
import { PopupBajaFisica } from '../../modales/popup-baja-fisica/popup-baja-fisica';
import { PopupBajaLogica } from '../../modales/popup-baja-logica/popup-baja-logica';
import { PopupReactivar } from '../../modales/popup-reactivar/popup-reactivar';
import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, CommonModule, TableModule, RouterLink, PopupBajaFisica, PopupBajaLogica, PopupReactivar, ToastModule, ConfirmPopupModule],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit{


  // @ViewChild(PopupBajaFisica) popup!: PopupBajaFisica;
  paramsBajaFis:PopupConfig = {
      message:"Se va a borrar de forma definitiva el registro. ¿Estás seguro que deseas borrarlo?",
      buttonName:"Baja fisica",
      severity:"danger"
    }

  paramsBajaLog:PopupConfig = {
      message:"Se va a dar de baja el personaje ¿Estás seguro?",
      buttonName:"Baja logica",
      severity:"warn"
    }

  paramsReactiv:PopupConfig = {
      message:"¿Deseas reactivar el personaje?",
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

  // abrirModal(){
  //   console.log("DDDDDDD")
  //   this.popup.confirm
  //   //cargarPersonajes()
  //   console.log("AAAAAAA")
  //   this.cargarPersonajes()
  // }

}
