import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LiquidacionesService } from '../liquidaciones.service';
import { FechasLiquidar } from './../fechasLiquidar';
import { SolicitudLiqManual } from './../solicitudLiqManual';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-liquidacion-manual',
  templateUrl: './liquidacion-manual.component.html',
  styleUrls: ['./liquidacion-manual.component.css']
})
export class LiquidacionManualComponent implements OnInit {
  
  ngOnInit(): void{

  }

  fechasLiquidar!: FechasLiquidar;
  mesesLiqManual: String[] = [];
  solicitudLiqManual: SolicitudLiqManual = new SolicitudLiqManual();

  constructor(private liquidacionService: LiquidacionesService, private router: Router) {}
 
 
  liqManualForm = new FormGroup({    
    anoLiqManual: new FormControl('',[
    Validators.required,
    Validators.min(2020),
    Validators.max(2100)  //el sistema inicio a operar en el año 2020
    ]),
    mesLiqManual: new FormControl('',[Validators.required])
  });


  onSubmit() {
    console.log(this.liqManualForm.value);
    this.solicitudLiqManual.mesLiquidar = this.liquidacionService.mesesDelAño.indexOf(this.liqManualForm.get('mesLiqManual')?.value);
    this.solicitudLiqManual.anoLiquidar = this.liqManualForm.get('anoLiqManual')?.value;
    console.log(this.solicitudLiqManual);
    this.liquidacionService
      .solicitarLiqManual(this.solicitudLiqManual)
      .subscribe(
        (respuesta => swal.fire(respuesta.mensaje)
         ));   
  };

  nitErrorMessage() {
    if (this.liqManualForm.get('anoLiqManual')?.hasError('required')) {
      return 'Porfavor ingrese un numero de año valido';
    } else if (this.liqManualForm.get('anoLiqManual')?.hasError('min')) {
      return 'Ingrese un año mayor al 2020.';
    } else if (this.liqManualForm.get('anoLiqManual')?.hasError('max')) {
      return 'Porfavor ingrese un numero de año valido.';
    }
    return null;
  }

  solicitarMesesLiqManual(anoLiqManual: number){
    this.liquidacionService.solicitarMesesLiqManual(anoLiqManual).subscribe(
      respuesta => this.mesesLiqManual = respuesta.mesesLiqManual);

      

  }

 } 

