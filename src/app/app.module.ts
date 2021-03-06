import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecolectaComponent } from './recolecta/recolecta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {ConductoresComponent } from './conductores/conductores.component';
import {LiquidacionesComponent } from './liquidaciones/liquidaciones.component'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSortModule} from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { ConductoresService } from './conductores/conductores.service';
import { LiquidacionesListarComponent } from './liquidaciones/liquidaciones-listar/liquidaciones-listar.component';
import {MatTableModule} from '@angular/material/table';
import { LiquidacionesService } from './liquidaciones/liquidaciones.service';
import { VehiculosAdminComponent } from './vehiculosAdmin/vehiculosAdmin.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { VehiculosAdminService } from './vehiculosAdmin/vehiculosAdmin.service';
import { VehiculosAdminCrearComponent } from './vehiculosAdmin/vehiculosAdmin-crear/vehiculosAdmin-crear.component';

@NgModule({
  declarations: [		
    AppComponent,
    LoginComponent,
    RecolectaComponent,
    HeaderComponent,
    FooterComponent,
    ConductoresComponent,
    LiquidacionesComponent,
    LiquidacionesListarComponent,
    VehiculosAdminComponent,
    AdministradorComponent,
    VehiculosAdminCrearComponent,
   ],
  imports: [
  
ReactiveFormsModule, 
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
  ],
  providers: [ConductoresService, LiquidacionesService, VehiculosAdminService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
