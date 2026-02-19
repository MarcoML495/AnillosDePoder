import { ChangeDetectorRef, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AnillosService } from '../servicios/anillos-service';
import { Router } from '@angular/router';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-juego',
  imports: [ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './juego.html',
  styleUrl: './juego.css',
})
export class Juego {
  protected readonly title = signal('anillosDePoder');
  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef, private route: Router) { }

  status: string = "inactive"
  partida: any = {}
  preguntaActual: any = {}
  error = ''

  victorias = 0
  derrotas = 0
  historialPreguntas = [0]

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    if (localStorage.getItem("victorias")) {
      this.victorias = parseInt(localStorage.getItem("victorias")!)
    } else {
      localStorage.setItem("victorias","0")
    }

    if (localStorage.getItem("derrotas")) {
      this.derrotas = parseInt(localStorage.getItem("derrotas")!)
    } else {
      localStorage.setItem("derrotas","0")
    }
  }

  empezar(): void {
    this.historialPreguntas = []
    this.anilloService.startGame().subscribe({
      next: data => { this.partida = data; this.cdr.detectChanges(); },
      error: err => this.error = err,
      complete: () => console.log('Observable emitted the complete notification')
    });
    this.cargarPregunta((Math.floor(Math.random() * 30) + 1).toString())
    this.status = "active"
    console.log(this.status)
    console.log(this.preguntaActual)
  }

  cargarPregunta(id: string) {
    this.anilloService.getQuestion(id).subscribe({
      next: data => { this.preguntaActual = data; this.cdr.detectChanges(); },
      error: err => this.error = err,
      complete: () => this.historialPreguntas.push(this.preguntaActual.id)
    });
  }

  responder(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: "¿Es esta tu respuesta final?",
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Si',
        severity: 'primary'
      },
      accept: () => {
        this.proccessAnswer(id)
      },
      reject: () => {}
    });
  }

  proccessAnswer(id: number) {
    let answerdata: any[] = []
    this.anilloService.answerQuestion(this.preguntaActual.id, id).subscribe({
      next: data => { answerdata = data; this.cdr.detectChanges(); },
      error: err => this.error = err,
      complete: () => {
        if (answerdata.toString() == "true") {
          alert("¡Has acertado!")
          this.anilloService.setCorrect(this.partida.id).subscribe({
            next: data => { this.partida = data; this.cdr.detectChanges(); },
            error: err => this.error = err,
            complete: () => {
              if (this.partida.numeroCorrectas >= 5) {
                alert("¡Has demostrado exitosamente tu conocimiento del señor de los anillos!")
                this.victorias++
                localStorage.setItem("victorias",this.victorias.toString())
                this.status = "inactive"
                this.anilloService.finishGame(this.partida.id).subscribe({
                  next: data => { this.cdr.detectChanges(); },
                  error: err => this.error = err,
                  complete: () => {}
                });
              } else {
                let nuevaPregunta = 0
                do {
                  nuevaPregunta = (Math.floor(Math.random() * 30) + 1)
                } while (this.historialPreguntas.includes(nuevaPregunta));
                this.cargarPregunta(nuevaPregunta.toString())
              }
            }
          });
        } else {
          alert("Has fallado y has perdido la partida")
          this.derrotas++
          localStorage.setItem("derrotas",this.derrotas.toString())
          this.status = "inactive"
          this.anilloService.finishGame(this.partida.id).subscribe({
            next: data => { this.cdr.detectChanges(); },
            error: err => this.error = err,
            complete: () => {}
          });
        }
      }
    });
  }
}
