import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, CommonModule, TableModule, RouterLink, PopupBajaFisica, PopupBajaLogica, PopupReactivar, ToastModule, ConfirmPopupModule,InputTextModule],
  providers: [MessageService],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit {

  private messageService = inject(MessageService);
  getParamsBajaFis(pid: string): PopupConfig {
    return {
      message: "Se va a borrar de forma definitiva el registro. ¿Estás seguro que deseas borrarlo?",
      buttonName: "",
      severity: "danger",
      function: () => {
        this.bajaFisica(pid)
      }
    }
  }
  getParamsBajaLog(pid: string): PopupConfig {
    return {
      message: "Se va a dar de baja el personaje ¿Estás seguro?",
      buttonName: "",
      severity: "warn",
      function: () => {
        this.bajaLogica(pid)
      }
    }
  }

  getParamsReactiv(pid: string): PopupConfig {
    return {
      message: "¿Deseas reactivar el personaje?",
      buttonName: "",
      severity: "info",
      function: () => {
        this.reactivar(pid)
      }
    }
  }

  protected readonly title = signal('anillosDePoder');

  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef, private route: Router) { }

  personajes: any[] = []
  error = ''
  searchValue: string | undefined;

  editar(item: any): void {
    this.route.navigate(["/editar", item.id])
  }

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.anilloService.getAllCharacters().subscribe({
      next: data => { this.personajes = data; this.cdr.detectChanges(); },
      error: err => this.error = err,
      complete: () => console.log('Observable emitted the complete notification')
    });
  }

  bajaFisica(pid: string) {
    this.error = ''
    this.anilloService.deleteCharacter(pid).subscribe({
      next: data => { this.cdr.detectChanges(); },
      error: err => {
        this.error = err
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede borrar ese personaje porque es portador.', life: 3000 });
      },
      complete: () => {
        console.log(this.error)
        if (this.error == '') {
          this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha borrado al personaje', life: 3000 });
          // window.location.reload()
          this.cargarPersonajes();
        }
      }
    });
  }

  bajaLogica(pid: string) {
    this.error = ''
    this.anilloService.deactivateCharacter(pid).subscribe({
      next: data => { this.cdr.detectChanges(); },
      error: err => {
        this.error = err
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al desactivar personaje', life: 3000 });
      },
      complete: () => {
        console.log(this.error)
        if (this.error == '') {
          this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha desactivado al personaje', life: 3000 });
          // window.location.reload()
          this.cargarPersonajes();
        }
      }
    });
  }

  reactivar(pid: string) {
    this.error = ''
    this.anilloService.reactivateCharacter(pid).subscribe({
      next: data => { this.cdr.detectChanges(); },
      error: err => {
        this.error = err
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al reactivar al personaje', life: 3000 });
      },
      complete: () => {
        console.log(this.error)
        if (this.error == '') {
          this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha reactivado al personaje', life: 3000 });
          // window.location.reload()
          this.cargarPersonajes();
        }
      }
    });
  }
}
