import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { AnillosService } from '../servicios/anillos-service';

@Component({
  selector: 'app-persistencia',
  imports: [TableModule, ButtonModule],
  templateUrl: './persistencia.html',
  styleUrl: './persistencia.css',
})
export class Persistencia {
  protected readonly title = signal('anillosDePoder');

  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef) { }

  personajes: any[] = []
  error = ''

  ngOnInit(): void {
    if (localStorage.getItem('portadores')) {
      this.personajes = JSON.parse(localStorage.getItem('portadores')!)
      console.log('Datos cargados por localstorage')
    } else {
      this.cargarPersonajes();
    }
  }

  cargarPersonajes() {
    this.anilloService.getPortadores().subscribe({
      next: data => { this.personajes = data; this.cdr.detectChanges(); },
      error: err => this.error = err,
      complete: () => {
        console.log('Datos cargados por consulta')
        localStorage.setItem('portadores',JSON.stringify(this.personajes))
      }
    });
  }
}
