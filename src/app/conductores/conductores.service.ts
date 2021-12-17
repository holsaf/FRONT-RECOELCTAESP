import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SolicitudCelda } from './solicitudCelda';
import swal from 'sweetalert2';


@Injectable()
export class ConductoresService {

  private urlSolicitudCelda: string = 'http://localhost:8080/conductores/celdaDescarga';
  private urlTipoResiduosDisponibles: string = 'http://localhost:8080/conductores/tipoResiduos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http : HttpClient) { }

  solicitarCelda( solicitudCelda : SolicitudCelda): Observable<any> {
    return this.http.post(this.urlSolicitudCelda , solicitudCelda, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        swal.fire('Error al digitar', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }

  solicitarTipoResiduos(): Observable<any>{
    return this.http.get(this.urlTipoResiduosDisponibles)
  }

}
