import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConductoresComponent } from './conductores/conductores.component';
import { LiquidacionManualComponent } from './liquidaciones/liquidacion-manual/liquidacion-manual.component';
import { LiquidacionesListarComponent } from './liquidaciones/liquidaciones-listar/liquidaciones-listar.component';
import { LiquidacionesComponent } from './liquidaciones/liquidaciones.component';
import { LoginComponent } from './login/login.component';
import { RecolectaComponent } from './recolecta/recolecta.component';

const routes: Routes = [ { path: '', redirectTo: '/home' , pathMatch: 'full'},
{path:'login', component: LoginComponent},
{path:'home' , component: RecolectaComponent},
{path:'conductores' , component: ConductoresComponent},
{path:'liquidaciones' , component: LiquidacionesComponent},
{path:'liquidaciones/liquidacionesListar' , component: LiquidacionesListarComponent},
{path:'liquidacionManual' , component: LiquidacionManualComponent}
//,{ path: '**' , component: PaginaNoEncontrada}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
