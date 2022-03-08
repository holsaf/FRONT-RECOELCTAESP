import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vehiculo } from './vehiculo';

@Injectable({
  providedIn: 'root',
})
export class VehiculosAdminService {
  private urlSolicitarVehiculo: string =
    'http://localhost:8080/vehiculos/vehiculo';
  

  private urlCrearVehiculo: string =
    'http://localhost:8080/vehiculos/crearVehiculo';

  private urlActualizarVehiculo: string =
    'http://localhost:8080/vehiculos/actualizarVehiculo';

  private urlEliminarVehiculo: string =
    'http://localhost:8080/vehiculos/borrarVehiculo';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) {}

  crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post(this.urlCrearVehiculo, vehiculo).pipe(
      map((response: any) => response.vehiculo as Vehiculo),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  solicitarVehiculo(placa: string): Observable<Vehiculo> {
    return this.http
      .get<Vehiculo>(`${this.urlSolicitarVehiculo}/${placa}`)
      .pipe(
        catchError((e) => {
          if (e.status != 401 && e.error.mensaje) {
            this.router.navigate(['/Vehiculo']);
            console.error(e.error.mensaje);
          }

          return throwError(e);
        })
      );
  }

  actualizarvehiculo(vehiculo: Vehiculo): Observable<any> {
    return this.http
      .put<any>(
        this.urlActualizarVehiculo,
        vehiculo
      )
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /*eliminarVehiculo(placa: string): Observable<Vehiculo> {
    return this.http
      .delete<Vehiculo>(`${this.urlEliminarVehiculo}/${placa}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }*/
}
