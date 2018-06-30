import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Mascota } from '../../clases/mascota';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculoService } from '../../servicios/vehiculo/vehiculo.service';
import { MascotaService } from '../../servicios/mascota/mascota.service';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { TurnoService } from '../../servicios/turno/turno.service';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {
  cuerpoTabla: any;
  cols: any[];
  tituloTabla = "Seleccionar mascota para turno";
  turnoSelecto: any;
  modificarTurno: boolean = false;
  desc: any;
  constructor(private miServicioVehiculo: VehiculoService,private miVehiculo: Vehiculo,private miMascota: Mascota, private miHttp: MiHttpService, private miRouter: Router, private miServicioMascota: MascotaService, private miUsuario: UsuarioService, private servicioTurno: TurnoService) { }

  ngOnInit() {
    let data = { id_usuario: this.miUsuario.getIdUsuario() };
    this.servicioTurno.traerMisTurnos(data)
      .then(data => {
        if (data != "error" && data != " ") {
          this.cuerpoTabla = data;
          this.cols = [
            { field: 'fecha', header: 'Fecha' },
            { field: 'patente', header: 'Patente' },
            { field: 'marca', header: 'Marca' },
            { field: 'color', header: 'Color' },
            { field: 'descripcion', header: 'Descripcion' },
            { field: 'estado', header: 'Estado' }
          ]
        }
      })
  }

  onRowSelect(event) {
    console.log(this.turnoSelecto);
    this.desc = this.turnoSelecto.descripcion;
  }

  editarTurno() {
    this.modificarTurno = true;
  }
  cancelarEdicion() {
    this.modificarTurno = false;
  }

  cancelarTurno() {
    this.turnoSelecto.estado = 3;
    this.servicioTurno.actualizarTurno(this.turnoSelecto)
      .then(data => {
        if (data == 'ok') {
          swal({
            type: 'success',
            title: 'Ok!',
            text: 'Turno actualizado',
          })
        } else {
          swal({
            type: 'error',
            title: 'Error!',
            text: 'Error al actualizar turno',
          })
        }
      })
  }
  actualizarTurno() {
    this.turnoSelecto.descripcion = this.desc;
    this.servicioTurno.actualizarTurno(this.turnoSelecto)
      .then(data => {
        if (data == 'ok') {
          swal({
            type: 'success',
            title: 'Ok!',
            text: 'Turno actualizado',
          })
        } else {
          swal({
            type: 'error',
            title: 'Error!',
            text: 'Error al actualizar turno',
          })
        }
      })
  }
}
