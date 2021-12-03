import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SolicitudCelda } from './solicitudCelda';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class ConductoresService {

  private urlGetCeldaDisponible: string = 'http://localhost:8080/conductores/celdaDescarga';
  private urlGetTipoResiduos: string = 'http://localhost:8080/conductores/tipoResiduos';

  constructor(private http : HttpClient) { }

  getCelda( solicitudCelda : SolicitudCelda): Observable<any> {
    //return of(usuarioJson);
    return this.http.get(this.urlGetCeldaDisponible +`?placa=${solicitudCelda.placa}
                        &cedula=${solicitudCelda.cedula}&peso=${solicitudCelda.peso}
                        &tipoResiduo=${solicitudCelda.tipoResiduo}&nombreDeposito=
                        ${solicitudCelda.deposito}`).pipe(
      catchError(e =>{
        swal.fire('Error al digitar', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }

  getTipoResiduos(): Observable<any>{

    return this.http.get(this.urlGetTipoResiduos)
  }

}
