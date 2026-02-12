import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portadores-component',
  imports: [FormsModule],
  templateUrl: './portadores-component.html',
  styleUrl: './portadores-component.css',
})
export class PortadoresComponent {

  nombreAnillo = ''
  nombrePortado = ''
  raza = ''
  corrupcion = 0

  ngOnInit(): void {
    this.nombreAnillo = localStorage.getItem("nombreAnillo") ?? ''
    this.nombrePortado = localStorage.getItem("nombrePortador") ?? ''
    this.raza = localStorage.getItem("raza") ?? ''
    this.corrupcion = Number(localStorage.getItem("corrupcion")) ?? 0
  }

  guardarDatos() {
    localStorage.setItem("nombreAnillo",this.nombreAnillo)
    localStorage.setItem("nombrePortador",this.nombrePortado)
    localStorage.setItem("raza",this.raza)
    localStorage.setItem("corrupcion",JSON.stringify(this.corrupcion))
    alert("datos guardados")
  }
}
