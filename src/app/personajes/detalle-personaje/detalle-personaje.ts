import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { AnillosService } from '../../servicios/anillos-service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { Badge } from 'primeng/badge';
import { DatePickerModule } from 'primeng/datepicker';
import { Raza } from '../../interfaces/raza';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-personaje',
  imports: [ReactiveFormsModule, SelectModule, InputTextModule, TextareaModule, SelectButtonModule, ButtonModule, SliderModule, Badge, DatePickerModule, RouterLink],
  templateUrl: './detalle-personaje.html',
  styleUrl: './detalle-personaje.css',
})
export class DetallePersonaje {
  protected readonly title = signal('anillosDePoder');

  constructor(private anilloService: AnillosService, private cdr: ChangeDetectorRef, private routeActiva: ActivatedRoute) {

  }

  personaje: any = {}
  error = ''

  listaRazas: string[] = ['ELFO','ENANO','HUMANO','MAIAR','OSCURO']

  formPersonaje: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    raza: new FormControl('', [
      Validators.required
    ]),
    fechaNacimiento: new FormControl('', [
      Validators.required
    ]),
    corrupcion: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ])

  })
  
  ngOnInit(): void {

    const id = this.routeActiva.snapshot.paramMap.get('id')
    if(id) {
      this.cargarPersonaje(id);
      console.log("Datos comprobacion"+this.personaje)
    }
  }

  cargarPersonaje (id:string) {
    this.anilloService.getCharacter(id).subscribe({
      next: data => {
        console.log(data) 
        this.personaje = data
        this.formPersonaje.get("nombre")?.setValue(this.personaje.nombre)
        this.formPersonaje.get("raza")?.setValue(this.personaje.raza)
        this.formPersonaje.get("fechaNacimiento")?.setValue(this.personaje.fechaNacimiento)
        this.formPersonaje.get("corrupcion")?.setValue(this.personaje.nivelCorrupcion)},
      error: err => this.error = err,
      complete: () => console.log('Observable emitted the complete notification')
    });
  }

  enviar() {
    alert("anillo creado")
  }

  limpiar() {
    
  }
}
