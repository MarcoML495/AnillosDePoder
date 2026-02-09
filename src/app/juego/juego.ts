import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AnillosService } from '../servicios/anillos-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego',
  imports: [ButtonModule],
  templateUrl: './juego.html',
  styleUrl: './juego.css',
})
export class Juego {
  protected readonly title = signal('anillosDePoder');
  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef, private route: Router) { }

  status: string = "inactive"
  preguntaActual: any = {}
  error = ''

  empezar(): void {
    this.cargarPregunta((Math.floor(Math.random() * 30)+1).toString())
    this.status = "active"
    console.log(this.status)
    console.log(this.preguntaActual)
  }

  cargarPregunta (id:string) {
    this.anilloService.getQuestion(id).subscribe({
      next: data => { this.preguntaActual = data; this.cdr.detectChanges(); },
      error: err => this.error = err,
      complete: () => console.log('Observable emitted the complete notification')
    });
  }
}
