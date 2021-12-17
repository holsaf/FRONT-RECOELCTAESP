import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConductoresService } from './conductores.service';
import { SolicitudCelda } from './solicitudCelda';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css'],
})
export class ConductoresComponent implements OnInit {

  listaTipoResiduos: String [] = [];
  solicitudCelda: SolicitudCelda = new SolicitudCelda;
  residuoSeleccion = new FormControl;

  constructor(private conductorService: ConductoresService) {
    
    this.conductorService.solicitarTipoResiduos().subscribe(
      respuesta => this.listaTipoResiduos = respuesta.tipoResiduos)
      }  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 

  conductoresForm = new FormGroup({
    cedula: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]*$'),
    ]),

    placa: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8),
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
    ]),
    peso: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.max(100000),
      Validators.pattern('^[0-9]*$'),
    ]),

    tipoResiduo: new FormControl('', [Validators.required])
  });

  onSubmit() {
    console.log(this.conductoresForm.value);

  }

  placaErrorMessage() {
    if (this.conductoresForm.get('placa')?.hasError('required')) {
      return 'Porfavor ingrese la placa';
    } else if (this.conductoresForm.get('placa')?.hasError('minlength')) {
      return 'Ingrese una placa de 5 a 8 caracteres, sin guiones ni espacios.';
    } else if (this.conductoresForm.get('placa')?.hasError('maxlength')) {
      return 'Ingrese una placa de 5 a 8 caracteres, sin guiones ni espacios.';
    } else if (this.conductoresForm.get('placa')?.hasError('pattern')) {
      return 'Ingrese una placa de 5 a 8 caracteres, solo letras y numeros.';
    }
    return null;
  }

  cedulaErrorMessage() {
    if (this.conductoresForm.get('cedula')?.hasError('required')) {
      return 'Porfavor ingrese la cedula del conductor';
    } else if (this.conductoresForm.get('cedula')?.hasError('minlength')) {
      return 'Ingrese un numero de 6 a 12 digitos, sin puntos ni espacios.';
    } else if (this.conductoresForm.get('cedula')?.hasError('maxlength')) {
      return 'Ingrese  un numero de 6 a 12 digitos, sin puntos ni espacios';
    } else if (this.conductoresForm.get('cedula')?.hasError('pattern')) {
      return 'Ingrese  un numero de 6 a 12 digitos, sin puntos ni espacios';
    }
    return null;
  }

  pesoErrorMessage() {
    if (this.conductoresForm.get('peso')?.hasError('required')) {
      return 'Porfavor ingrese el peso del vehiculo';
    } else if (this.conductoresForm.get('peso')?.hasError('min')) {
      return 'Ingrese un numero entre 1000 y 100000, sin letras ni espacios.';
    } else if (this.conductoresForm.get('peso')?.hasError('max')) {
      return 'Ingrese un numero entre 1000 y 100000, sin letras ni espacios.';
    } else if (this.conductoresForm.get('peso')?.hasError('pattern')) {
      return 'Ingrese un numero entre 1000 y 100000, sin letras ni espacios.';
    }
    return null;
  }



  solicitarCelda(){
    this.solicitudCelda.cedula = this.conductoresForm.get('cedula')?.value;
    this.solicitudCelda.placa = this.conductoresForm.get('placa')?.value;
    this.solicitudCelda.peso = this.conductoresForm.get('peso')?.value;
    this.solicitudCelda.tipoResiduo = this.conductoresForm.get('tipoResiduo')?.value;
    console.log(this.solicitudCelda);
    this.conductorService.solicitarCelda(this.solicitudCelda).subscribe(
    respuesta => swal.fire('Vehiculo: '+ respuesta.celdaAsignada.placaAsignada , 'Porfavor descargar en la celda: '+ respuesta.celdaAsignada.celdaAsignada ,'success'));
    }

  
}
  
