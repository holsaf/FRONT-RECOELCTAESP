import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private urlApiUsuarios: string = 'http://localhost:8080/api/usuarios';


  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    //return of(usuarioJson);
    return this.http.get(this.urlApiUsuarios).pipe(
      map((response) => response as Usuario[])
    );
  }

  getUsuariosPag(page: number): Observable<any> {
    //return of(usuarioJson);
    return this.http.get(this.urlApiUsuarios + '/page/' + page).pipe(
      map((response:any) => {
        return (response.content as Usuario[]);
      })
    )}
}
