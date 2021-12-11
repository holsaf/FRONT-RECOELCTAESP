import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LiquidacionesService } from './liquidaciones.service';
import { SolicitudLiquidacion } from './solicitudLiquidacion';
import { LiquidacionEmpresa } from './liquidacionEmpresa';
import { LiquidacionVehiculo } from './liquidacionVehiculo';
import { Router, RouterModule } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.component.html',
  styleUrls: ['./liquidaciones.component.css'],
})
export class LiquidacionesComponent implements OnInit {

  solicitudLiquidacion: SolicitudLiquidacion = new SolicitudLiquidacion();
  liquidacionEmpresa: LiquidacionEmpresa | undefined;
  mesSeleccion = new FormControl();
  yearSeleccion = new FormControl();
  mesesLiquidar: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  yearsLiquidar: string[] = ['2018', '2019', '2020', '2021'];

  constructor(private liquidacionService: LiquidacionesService, private router: Router) {}

  ejemploVehiculo: LiquidacionVehiculo []= [{placaVehiculo: "VXH321", descuentos: 300000, valorAPagar: 5000000, numeroDescargas: 8 }];
  ejemploLiquidacion: LiquidacionEmpresa = {nombreEmpresa: "flota huila", mesLiquidacion: "agosto/2021", listaLiquidaciones: this.ejemploVehiculo }
    
  liquidacionesForm = new FormGroup({
    nit: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
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
    this.solicitudLiquidacion.nit = this.liquidacionesForm.get('nit')?.value;
    this.solicitudLiquidacion.mes = 8;
    this.solicitudLiquidacion.ano = 2021;
    console.log(this.solicitudLiquidacion);
    this.liquidacionService
      .getLiquidacionEmpresa(this.solicitudLiquidacion)
      .subscribe(
        (respuesta) =>{
          this.liquidacionService.liquidacionesEmpresa = Object.assign({},respuesta.liquidacionEmpresa);
          this.router.navigate(['/liquidacionesListar']);
         })   
  }

  enviarDato(){
    //this.liquidacionService.liquidacionesEmpresa = Object.assign({}, this.ejemploLiquidacion);
  }

  ngOnInit(): void {}
}
