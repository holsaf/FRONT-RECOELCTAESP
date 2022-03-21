import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LiquidacionesService } from './liquidaciones.service';
import { SolicitudLiquidacion } from './solicitudLiquidacion';
import { LiquidacionEmpresa } from './liquidacionEmpresa';
import { LiquidacionVehiculo } from './liquidacionVehiculo';
import { Router, RouterModule } from '@angular/router';
import { FechasLiquidar } from './fechasLiquidar';

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.component.html',
  styleUrls: ['./liquidaciones.component.css'],
})
export class LiquidacionesComponent implements OnInit {

  ngOnInit(): void {}

  solicitudLiquidacion: SolicitudLiquidacion = new SolicitudLiquidacion();
  liquidacionEmpresa: LiquidacionEmpresa | undefined;
  fechasLiquidar!: FechasLiquidar;

  constructor(private liquidacionService: LiquidacionesService, private router: Router) {
    this.liquidacionService.solicitarFechasLiquidar().subscribe(
      respuesta => this.fechasLiquidar = respuesta.fechasLiquidar);
      }
    
  liquidacionesForm = new FormGroup({
    nit: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
    mes: new FormControl('',[Validators.required]),
    year: new FormControl('',[Validators.required])
  });

  nitErrorMessage() {
    if (this.liquidacionesForm.get('nit')?.hasError('required')) {
      return 'Porfavor ingrese el NIT de la empresa, sin codigo de verificacion';
    } else if (this.liquidacionesForm.get('nit')?.hasError('minlength')) {
      return 'Ingrese un numero de minimo de 9 digitos, sin guiones ni espacios.';
    } else if (this.liquidacionesForm.get('nit')?.hasError('maxlength')) {
      return 'Ingrese un numero de maximo de 10 digitos, sin guiones ni espacios.';
    } else if (this.liquidacionesForm.get('nit')?.hasError('pattern')) {
      return 'Ingrese un numero de 10 digitos, sin guiones ni espacios.';
    }
    return null;
  }

  onSubmit() {
    
    this.solicitudLiquidacion.nit = this.liquidacionesForm.get('nit')?.value;
    this.solicitudLiquidacion.mes = this.liquidacionService.mesesDelAño.indexOf(this.liquidacionesForm.get('mes')?.value);
    this.solicitudLiquidacion.ano = this.liquidacionesForm.get('year')?.value;
    console.log(this.solicitudLiquidacion);
    this.liquidacionService
      .solicitarLiquidacionEmpresa(this.solicitudLiquidacion)
      .subscribe(
        (respuesta) => {
          this.liquidacionService.liquidacionesEmpresa = Object.assign({},respuesta.liquidacionEmpresa);
          this.router.navigate(['liquidaciones/liquidacionesListar']);
         })   
  }


}
