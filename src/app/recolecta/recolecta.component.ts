import { Component, OnInit } from '@angular/core';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-recolecta',
  templateUrl: './recolecta.component.html',
  styleUrls: ['./recolecta.component.css']
})
export class RecolectaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  notificarRegistrar(){
    swal.fire('No esta habilitado el registro por este medio',
    ' Porfavor dirijase a la administracion para registrarse' 
    ,'info')
  }

}
