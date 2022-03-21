import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SolicitudCelda } from './solicitudCelda';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ConductoresService {

  private urlSolicitudCelda: string = 'http://ec2-3-17-152-104.us-east-2.compute.amazonaws.com:8080/conductores/celdaDescarga';
  private urlTipoResiduosDisponibles: string = 'http://ec2-3-17-152-104.us-east-2.compute.amazonaws.com:8080/conductores/tipoResiduos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http : HttpClient) { }

  solicitarCelda( solicitudCelda : SolicitudCelda): Observable<any> {
    return this.http.post(this.urlSolicitudCelda , solicitudCelda, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al digitar', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }

  solicitarTipoResiduos(): Observable<any>{
    return this.http.get(this.urlTipoResiduosDisponibles)
  }

}
