import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudLiquidacion } from './solicitudLiquidacion';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LiquidacionEmpresa } from './liquidacionEmpresa';
import { SolicitudLiqManual } from './solicitudLiqManual';


@Injectable({
  providedIn: 'root',
})
export class LiquidacionesService {
  private urlLiquidacionEmpresa: string =
    'http://localhost:8080/liquidaciones/liquidarEmpresa';
  private urlFechasLiquidar: string =
    'http://localhost:8080/liquidaciones/fechasLiquidar';
  private urlLiquidarManual: string =
    'http://localhost:8080/liquidaciones/liquidacionManual';
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient) {}

  liquidacionesEmpresa!: LiquidacionEmpresa; //Atributo para comunicar las liquidaciones del componente Liquidaciones a Liquidaciones-listar

  solicitarLiquidacionEmpresa(
    solicitudLiquidacion: SolicitudLiquidacion
  ): Observable<any> {
    return this.http
      .get(
        this.urlLiquidacionEmpresa +
          `?nit=${solicitudLiquidacion.nit}&mesLiquidar=${solicitudLiquidacion.mes}&anoLiquidar=${solicitudLiquidacion.ano}`
      )
      .pipe(
        catchError((e) => {
          swal.fire('Error al solicitar Liquidacion', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  solicitarLiqManual(
    solicitudLiqManual: SolicitudLiqManual
  ): Observable<any> {
    return this.http
      .post(
        this.urlLiquidarManual, solicitudLiqManual, {headers : this.httpHeaders})
      .pipe(
        catchError((e) => {
          swal.fire('Error al solicitar Liquidacion', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  solicitarFechasLiquidar(): Observable<any> {
    return this.http.get(this.urlFechasLiquidar);
  }
}
