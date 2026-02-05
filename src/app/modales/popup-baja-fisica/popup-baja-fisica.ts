import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PopupConfig } from '../../interfaces/popup-config';
import { AnillosService } from '../../servicios/anillos-service';

@Component({
  selector: 'app-popup-baja-fisica',
  imports: [ButtonModule, ConfirmPopupModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './popup-baja-fisica.html',
  styleUrl: './popup-baja-fisica.css',
})
export class PopupBajaFisica {

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
        this.config.function()
        
      },
      reject: () => {}
    });
    console.log("SSSSSS")
  }
}
