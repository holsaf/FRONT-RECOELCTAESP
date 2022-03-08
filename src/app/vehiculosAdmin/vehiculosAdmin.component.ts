import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from './vehiculo';
import { VehiculosAdminService } from './vehiculosAdmin.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculosAdmin',
  templateUrl: './vehiculosAdmin.component.html',
  styleUrls: ['./vehiculosAdmin.component.css'],
})
export class VehiculosAdminComponent implements OnInit {
  errores!: string[];
  vehiculo: Vehiculo = new Vehiculo();

  constructor(private vehiculoAdminService: VehiculosAdminService, private router: Router) {}

  ngOnInit() {}

  vehiculosAdminForm1 = new FormGroup({
    placa: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8),
      Validators.pattern('^[A-Z0-9]*$'),
    ])
  });

  vehiculosAdminForm = new FormGroup({
    placa2: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8),
      Validators.pattern('^[A-Z0-9]*$'),
    ]),
    nit: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
      Validators.pattern('^[A-Z0-9]*$'),
    ]),
    peso: new FormControl('', [
      Validators.required,
      Validators.min(10000),
      Validators.max(30000),
      Validators.pattern('^[0-9]*$'),
    ]),
    capComercial: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.max(10000),
      Validators.pattern('^[0-9]*$'),
    ]),
    capDomiciliaria: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.max(10000),
      Validators.pattern('^[0-9]*$'),
    ]),
    capAgricola: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.max(10000),
      Validators.pattern('^[0-9]*$'),
    ]),
    capBiomedico: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.max(10000),
      Validators.pattern('^[0-9]*$'),
    ]),
    capIndustrial: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.max(10000),
      Validators.pattern('^[0-9]*$'),
    ]),
    capConstruccion: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.max(10000),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  placaErrorMessage() {
    if (this.vehiculosAdminForm.get('placa')?.hasError('required')) {
      return 'Porfavor ingrese la placa';
    } else if (this.vehiculosAdminForm.get('placa')?.hasError('minlength')) {
      return 'Ingrese una placa de 5 a 8 caracteres, sin guiones ni espacios.';
    } else if (this.vehiculosAdminForm.get('placa')?.hasError('maxlength')) {
      return 'Ingrese una placa de 5 a 8 caracteres, sin guiones ni espacios.';
    } else if (this.vehiculosAdminForm.get('placa')?.hasError('pattern')) {
      return 'Ingrese una placa valida, solo letras y numeros.';
    }
    return null;
  }

  pesoErrorMessage() {
    if (this.vehiculosAdminForm.get('peso')?.hasError('required')) {
      return 'Porfavor ingrese el peso del vehiculo';
    } else if (this.vehiculosAdminForm.get('peso')?.hasError('min')) {
      return 'Ingrese un numero minimo de 10000, sin letras ni espacios.';
    } else if (this.vehiculosAdminForm.get('peso')?.hasError('max')) {
      return 'Ingrese un numero maximo de 30000, sin letras ni espacios.';
    } else if (this.vehiculosAdminForm.get('peso')?.hasError('pattern')) {
      return 'Ingrese un numero entre 10000 y 30000, sin letras ni espacios.';
    }
    return null;
  }

  nitErrorMessage() {
    if (this.vehiculosAdminForm.get('nit')?.hasError('required')) {
      return 'Porfavor ingrese el NIT de la empresa, sin codigo de verificacion';
    } else if (this.vehiculosAdminForm.get('nit')?.hasError('minlength')) {
      return 'Ingrese un numero de minimo de 9 digitos, sin guiones ni espacios.';
    } else if (this.vehiculosAdminForm.get('nit')?.hasError('maxlength')) {
      return 'Ingrese un numero de maximo de 10 digitos, sin guiones ni espacios.';
    } else if (this.vehiculosAdminForm.get('nit')?.hasError('pattern')) {
      return 'Ingrese un numero de 10 digitos, sin guiones ni espacios.';
    }
    return null;
  }

  solicitarVehiculo() {
    this.vehiculoAdminService
      .solicitarVehiculo(this.vehiculosAdminForm1.get('placa')?.value)
      .subscribe(
        (vehiculo) => {
          this.vehiculo = vehiculo;
          console.log(this.vehiculo);
        },
        (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error del servidro: ' + err.status);
          console.error(err.error.errors);
        }
      );

  }

  crearVehiculo(): void {
    console.log(this.vehiculo);
    this.vehiculo.nitEmpresa = this.vehiculosAdminForm.get('nit')?.value;
    this.vehiculo.placaVehiculo = this.vehiculosAdminForm.get('placa2')?.value;
    this.vehiculo.pesoVehiculo = this.vehiculosAdminForm.get('peso')?.value;
    this.vehiculo.capComercial = this.vehiculosAdminForm.get('capComercial')?.value;
    this.vehiculo.capDomiciliaria = this.vehiculosAdminForm.get('capDomiciliaria')?.value;
    this.vehiculo.capAgricola = this.vehiculosAdminForm.get('capAgricola')?.value;
    this.vehiculo.capIndustrial = this.vehiculosAdminForm.get('capIndustrial')?.value;
    this.vehiculo.capBiomedico = this.vehiculosAdminForm.get('capBiomedico')?.value;
    this.vehiculo.capConstruccion = this.vehiculosAdminForm.get('capConstruccion')?.value;
    this.vehiculoAdminService.crearVehiculo(this.vehiculo).subscribe(
      (vehiculo) => {
        swal.fire(
          'Nuevo cliente',
          `El vehiculo ${vehiculo.placaVehiculo} ha sido creado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error del servidor: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  actualizarVehiculo(): void {
    this.vehiculo.nitEmpresa = this.vehiculosAdminForm.get('nit')?.value;
    this.vehiculo.placaVehiculo = this.vehiculosAdminForm.get('placa2')?.value;
    this.vehiculo.pesoVehiculo = this.vehiculosAdminForm.get('peso')?.value;
    this.vehiculo.capComercial = this.vehiculosAdminForm.get('capComercial')?.value;
    this.vehiculo.capDomiciliaria = this.vehiculosAdminForm.get('capDomiciliaria')?.value;
    this.vehiculo.capAgricola = this.vehiculosAdminForm.get('capAgricola')?.value;
    this.vehiculo.capIndustrial = this.vehiculosAdminForm.get('capIndustrial')?.value;
    this.vehiculo.capBiomedico = this.vehiculosAdminForm.get('capBiomedico')?.value;
    this.vehiculo.capConstruccion = this.vehiculosAdminForm.get('capConstruccion')?.value;
    console.log(this.vehiculo);
    this.vehiculoAdminService.actualizarvehiculo(this.vehiculo).subscribe(
      (json) => {
        swal.fire(
          'Vehiculo actualizado',
          `${json.mensaje}: ${json.vehiculo.placaVehiculo}`,
          'success'
        );
        this.vehiculo = new Vehiculo;
        this.router.navigate(['vehiculosAdmin']);
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error del servidor: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  /*eliminarVehiculo(): void {
    this.vehiculoAdminService
      .eliminarVehiculo(this.vehiculosAdminForm.get('placa2')?.value)
      .subscribe(
        (json) => {
          swal.fire('Vehiculo eliminado!', json.placaVehiculo , 'success');
        },
        (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error del servidor: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }*/
}
