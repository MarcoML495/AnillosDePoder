import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PopupConfig } from '../../interfaces/popup-config';
import { AnillosService } from '../../servicios/anillos-service';

@Component({
  selector: 'app-popup-reactivar',
  imports: [ButtonModule, ConfirmPopupModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './popup-reactivar.html',
  styleUrl: './popup-reactivar.css',
})
export class PopupReactivar {

  @Input() config!: PopupConfig
  @Input() pid!: string
  error = ''

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef) {}

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: this.config.message,
      rejectButtonProps: {
        label: 'asdfasdf',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'afssdf',
        severity: 'primary'
      },
      accept: () => {
        this.error = ''
        this.anilloService.reactivateCharacter(this.pid).subscribe({
            next: data => { this.cdr.detectChanges(); },
            error: err => {
              this.error = err
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al reactivar al personaje', life: 3000 });
            },
            complete: () => {
              console.log(this.error)
              if (this.error == '') {
                this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha reactivado al personaje', life: 3000 });
                window.location.reload()
              }
            }
        });
        
      },
      reject: () => {}
    });
    console.log("SSSSSS")
  }
}
