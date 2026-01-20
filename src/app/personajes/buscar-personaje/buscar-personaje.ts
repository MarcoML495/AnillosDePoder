import { Component, OnInit, signal } from '@angular/core';
import { AnillosService } from '../../servicios/anillos-service';

@Component({
  selector: 'app-buscar-personaje',
  imports: [],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit{
  protected readonly title = signal('anillosDePoder');

  constructor(private anilloService: AnillosService) {}

  personajes : any [] = []
  error = ''

  ngOnInit(): void {
    this.cargarPersonajes()
  }

  cargarPersonajes () {
    this.anilloService.getAllCharacters().subscribe({
      next: data => { this.personajes = data; console.log(data) },
      error: err => this.error = err,
      complete: () => console.log('Observable emitted the complete notification')
    });
  }
}
