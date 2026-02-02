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
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }
}
