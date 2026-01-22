import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { AnillosService } from '../../servicios/anillos-service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, CommonModule, TableModule, RouterLink],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit{
  protected readonly title = signal('anillosDePoder');

  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef, private route: Router) {}

  personajes : any [] = []
  error = ''

  editar(item:any): void {
    alert(`${item.id}: ${item.nombre}`)
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
