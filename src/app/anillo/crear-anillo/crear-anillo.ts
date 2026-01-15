import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Razas } from '../../clases/razas';
import { Raza } from '../../interfaces/raza';
import { Badge } from "primeng/badge";
@Component({
  selector: 'app-crear-anillo',
  imports: [ReactiveFormsModule, SelectModule, InputTextModule, TextareaModule, SelectButtonModule, ButtonModule, SliderModule, Badge],
  templateUrl: './crear-anillo.html',
  styleUrl: './crear-anillo.css',
})
export class CrearAnillo {

  raza = new Razas()
  listaRazas: Raza[] = this.raza.razas

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    portador: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    raza: new FormControl('', [
      Validators.required
    ]),
    poder: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    corrupcion: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ])

  })

  enviar() {
    alert("anillo creado")
  }
}

