import { Component, Input, OnInit } from '@angular/core';
import { LiquidacionEmpresa } from '../liquidacionEmpresa';
import { LiquidacionesService } from '../liquidaciones.service';



@Component({
  selector: 'app-liquidaciones-listar',
  templateUrl: './liquidaciones-listar.component.html',
  styleUrls: ['./liquidaciones-listar.component.css']
})
export class LiquidacionesListarComponent implements OnInit {


  //@ViewChild(MatPaginator) paginator: MatPaginator;
  totalPagar: number = 0;

  constructor(private liquidacionService: LiquidacionesService){}

  ngOnInit(): void {
  }

  liquidacionEmpresa = this.liquidacionService.liquidacionesEmpresa;
  dataSource = this.liquidacionEmpresa.listaLiquidaciones;
  displayedColumns: string[] = ['Placa', 'Descargas', 'Descuentos', 'Valor a Pagar' ];
  

  solicitarTotalPagar(): number{
    return this.liquidacionEmpresa.listaLiquidaciones.
    reduce((sum, value)=> sum + (value.valorAPagar - value.descuentos), 0);
  }
  

  

}
