import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.component.html',
  styleUrls: ['./liquidaciones.component.css'],
})
export class LiquidacionesComponent implements OnInit {
  
  mesSeleccion = new FormControl;
  yearSeleccion = new FormControl;
  mesesLiquidar:string[]= ["Enero","Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio" , "Agosto", "Septiembre", "Octubre" , "Noviembre" , "Diciembre"];
  yearsLiquidar: string[]= ["2018","2019","2020", "2021"]

  liquidacionesForm = new FormGroup({
    nit: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  nitErrorMessage() {
    if (this.liquidacionesForm.get('nit')?.hasError('required')) {
      return 'Porfavor ingrese el NIT de la empresa, sin codigo de verificacion';
    } else if (this.liquidacionesForm.get('nit')?.hasError('minlength')) {
      return 'Ingrese un numero de 10 digitos, sin guiones ni espacios.';
    } else if (this.liquidacionesForm.get('nit')?.hasError('maxlength')) {
      return 'Ingrese un numero de 10 digitos, sin guiones ni espacios.';
    } else if (this.liquidacionesForm.get('nit')?.hasError('pattern')) {
      return 'Ingrese un numero de 10 digitos, sin guiones ni espacios.';
    }
    return null;
  }

  onSubmit() {
    console.log(this.liquidacionesForm.value);
  }

  constructor() {}

  ngOnInit(): void {}
}
