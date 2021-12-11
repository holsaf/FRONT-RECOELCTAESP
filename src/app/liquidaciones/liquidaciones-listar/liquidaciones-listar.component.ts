import { Component, Input, OnInit } from '@angular/core';
import { LiquidacionEmpresa } from '../liquidacionEmpresa';
import { LiquidacionesService } from '../liquidaciones.service';


@Component({
  selector: 'app-liquidaciones-listar',
  templateUrl: './liquidaciones-listar.component.html',
  styleUrls: ['./liquidaciones-listar.component.css']
})
export class LiquidacionesListarComponent implements OnInit {




  constructor(private liquidacionService: LiquidacionesService){}

  ngOnInit(): void {
  }

  liquidacionEmpresa = this.liquidacionService.liquidacionesEmpresa;
  displayedColumns: string[] = ['Placa', 'Descargas', 'Descuentos', 'Valor a Pagar'];
  dataSource = this.liquidacionEmpresa.listaLiquidaciones;
  

  

}
