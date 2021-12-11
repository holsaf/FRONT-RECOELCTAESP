import { LiquidacionVehiculo } from "./liquidacionVehiculo";

export interface LiquidacionEmpresa{
    nombreEmpresa: string;
    mesLiquidacion: string;
    listaLiquidaciones: LiquidacionVehiculo[];
  }