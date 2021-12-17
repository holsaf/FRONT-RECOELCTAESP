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
export class LiquidacionManualComponent {
  
  fechasLiquidar!: FechasLiquidar;
  solicitudLiqManual: SolicitudLiqManual = new SolicitudLiqManual();

  constructor(private liquidacionService: LiquidacionesService, private router: Router) {
    this.liquidacionService.solicitarFechasLiquidar().subscribe(
      respuesta => this.fechasLiquidar = respuesta.fechasLiquidar) 
    }
 
  liqManualForm = new FormGroup({    
    mes: new FormControl('',[Validators.required]),
    year: new FormControl('',[Validators.required])
  });


  onSubmit() {
    console.log(this.liqManualForm.value);
    this.solicitudLiqManual.mesLiquidar = this.liqManualForm.get('mes')?.value;
    this.solicitudLiqManual.yearLiquidar = this.liqManualForm.get('year')?.value;
    console.log(this.solicitudLiqManual);
    this.liquidacionService
      .solicitarLiqManual(this.solicitudLiqManual)
      .subscribe(
        (respuesta => swal.fire(respuesta.mensaje)
         ));   

  };

 } 

