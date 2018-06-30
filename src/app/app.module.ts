import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, Route } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

// CLASES UTILIZADAS
import { Usuario } from './clases/usuario';
import { Mascota } from './clases/mascota';
import { Turno } from './clases/turno';
import { Vehiculo} from './clases/vehiculo';

// MODULO DE PRIMENG
import { PrimengModule } from './modulos/primeng/primeng.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// SERVICIOS PROPIOS
import { VehiculoService } from './servicios/vehiculo/vehiculo.service';
import { AdminAuthService } from './servicios/autentificacion/admin-auth.service';
import { UserAuthService } from './servicios/autentificacion/user-auth.service';
import { UsuarioService } from './servicios/usuario/usuario.service';
import { MascotaService } from './servicios/mascota/mascota.service';
import { TurnoService } from './servicios/turno/turno.service';
import { MiHttpService } from './servicios/http/mi-http.service';
import { HttpModule } from '@angular/http';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MenuClienteComponent } from './componentes/menu-cliente/menu-cliente.component';
import { MisMascotasComponent } from './componentes/mis-mascotas/mis-mascotas.component';
import { MisturnosComponent } from './componentes/misturnos/misturnos.component';
import { AltaMascotaComponent } from './componentes/alta-mascota/alta-mascota.component';
import { EdadPipePipe } from './pipe/edad-pipe.pipe';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { TablaMisMascotasComponent } from './componentes/tabla-mis-mascotas/tabla-mis-mascotas.component';
import { DescTurnoPipe } from './pipe/desc-turno.pipe';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { VerUsuariosComponent } from './componentes/ver-usuarios/ver-usuarios.component';
import { TipoUsuarioPipe } from './pipe/tipo-usuario.pipe';
import { VerTurnosComponent } from './componentes/ver-turnos/ver-turnos.component';
import { VerMascotasComponent } from './componentes/ver-mascotas/ver-mascotas.component';
import { VehiculoPipe } from './pipe/vehiculo.pipe';
import { TablaMisVehiculosComponent } from './componentes/tabla-mis-vehiculos/tabla-mis-vehiculos.component';
import { AltaVehiculoComponent } from './componentes/alta-vehiculo/alta-vehiculo.component';


const config: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '*',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [UserAuthService],
    children: [
      {
        path: 'mascotas',
        component: MisMascotasComponent
      },
      {
        path: 'turnos',
        component: MisturnosComponent
      },
      {
        path: 'altaMascota',
        component: AltaMascotaComponent
      },
      {
        path: 'altaVehiculo',
        component: AltaVehiculoComponent
      },
      {
        path: 'soliTurno',
        component: SolicitarTurnoComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthService],
    children: [
      {
        path: 'altaUsuario',
        component: AltaUsuarioComponent
      },
      {
        path: 'verUsuarios',
        component: VerUsuariosComponent
      },
      {
        path: 'verTurnos',
        component: VerTurnosComponent
      },
      {
        path: 'verMascotas',
        component: VerMascotasComponent
      }
    ]
  },
  {
    path: 'registro',
    component: RegistroUsuarioComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ClienteComponent,
    RegistroUsuarioComponent,
    MenuComponent,
    MenuClienteComponent,
    MisMascotasComponent,
    MisturnosComponent,
    AltaMascotaComponent,
    EdadPipePipe,
    SolicitarTurnoComponent,
    TablaMisMascotasComponent,
    DescTurnoPipe,
    AltaUsuarioComponent,
    VerUsuariosComponent,
    TipoUsuarioPipe,
    VerTurnosComponent,
    VerMascotasComponent,
    VehiculoPipe,
    TablaMisVehiculosComponent,
    AltaVehiculoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    AngularFontAwesomeModule,
    HttpModule,
    RouterModule.forRoot(config)
  ],
  providers: [Vehiculo,Usuario, Mascota, Turno, MiHttpService, UsuarioService, MascotaService, TurnoService, AdminAuthService, UserAuthService,VehiculoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
