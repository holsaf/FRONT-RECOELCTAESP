import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { usuarioJson } from './usuarios.json'
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(){
    let page=1;
    //this.usuarioService.getUsuarios()
    this.usuarioService.getUsuariosPag(page)
    /*.subscribe(
      usuario => this.usuarios = usuario
    );*/
    .subscribe(
      //data => {console.log(data)}
      response => this.usuarios = response
    );
  }

}
