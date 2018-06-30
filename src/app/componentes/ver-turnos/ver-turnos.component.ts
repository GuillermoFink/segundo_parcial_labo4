import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../clases/usuario';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota/mascota.service';
import { Turno } from '../../clases/turno';
import { TurnoService } from '../../servicios/turno/turno.service';
import { SelectItem } from 'primeng/api';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.css']
})
export class VerTurnosComponent implements OnInit {

  cuerpoTabla: any;
  cols: any[];
  turnoSelecto: any;
  desc: string;
  modificarTurno: boolean; false;
  opciones: any[];
  constructor(private servicioUsuario: UsuarioService, private miMascota: Mascota, private miMascotaService: MascotaService, private servicioTurno: TurnoService, private miTurno: Turno) {
    this.opciones= [
      {label: 'Todos', value: null},
      {label: 'Activo', value: 1},
      {label: 'Realizado', value: 2},
      {label: 'Cancelado por el administrador', value: 0},
      {label: 'Cancelado por el usuario', value:3},
    ];
   }

  ngOnInit() {
    this.servicioTurno.traerTodosLosTurnos()
      .then(data => {
        this.cuerpoTabla = data;
        this.cols = [
          { field: 'nombre', header: 'Nombre' },
          { field: 'apellido', header: 'Apellido' },
          { field: 'marca', header: 'Marca' },
          { field: 'patente', header: 'Patente' },
          { field: 'color', header: 'Color' },
          { field: 'kilometros', header: 'Kms' },
          { field: 'fecha', header: 'Fecha' },
          { field: 'estado', header: 'Estado' }
        ];
        console.log(data);
      })
  }
  onRowSelect(objeto) {
    this.desc = this.turnoSelecto.descripcion;
    console.log(objeto);
  }
  editarTurno() {
    console.log("EDITO");
    this.modificarTurno = true;
  }
  confirmarTurno() {
    this.turnoSelecto.estado = 2;
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
  cancelarTurno() {
    this.turnoSelecto.estado = 0;
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
  cancelarEdicion() {
    this.modificarTurno = false;
  }

}
