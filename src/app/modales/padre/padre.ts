import { Component } from '@angular/core';
import { PopupConfirmar } from '../popup-confirmar/popup-confirmar';
import { PopupConfig } from '../../interfaces/popup-config';

@Component({
  selector: 'app-padre',
  imports: [PopupConfirmar],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  paramsModal:PopupConfig = {
    message:"Buenas tardes este es mi primer popup",
    buttonName:"Boton",
    severity:"info",
    function: this.aceptar
  }

  aceptar() {

  }
}