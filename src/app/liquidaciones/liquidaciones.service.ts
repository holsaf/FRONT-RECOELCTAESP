import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudLiquidacion } from './solicitudLiquidacion';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import { LiquidacionEmpresa } from './liquidacionEmpresa';


@Injectable({
  providedIn: 'root'
})
export class LiquidacionesService {

  private urlGetLiquidacionEmpresa: string = 'http://localhost:8080/liquidaciones/liquidarEmpresa';

  constructor(private http : HttpClient) { }

  liquidacionesEmpresa!: LiquidacionEmpresa; //Atributo para comunicar las liquidaciones del componente Liquidaciones a Liquidaciones-listar


  getLiquidacionEmpresa( solicitudLiquidacion : SolicitudLiquidacion): Observable <any> {
    //return of(usuarioJson);
    return this.http.get(this.urlGetLiquidacionEmpresa +`?nit=${solicitudLiquidacion.nit}&mesLiquidar=${solicitudLiquidacion.mes}&anoLiquidar=${solicitudLiquidacion.ano}`)
                        .pipe(
                          catchError(e =>{
                            swal.fire('Error al solicitar Liquidacion', e.error.mensaje, 'error');
                            return throwError(e);
                      }));
  }




}
