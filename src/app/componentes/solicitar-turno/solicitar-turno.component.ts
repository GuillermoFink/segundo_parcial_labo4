import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { Mascota } from '../../clases/mascota';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculoService } from '../../servicios/vehiculo/vehiculo.service';
import { TurnoService } from '../../servicios/turno/turno.service';
import { MascotaService } from '../../servicios/mascota/mascota.service';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  id_usuario: any;
  constructor(private miServicioVehiculo:VehiculoService,private miVehiculo: Vehiculo ,private miMascota: Mascota, private miHttp: MiHttpService, private miRouter: Router, private miServicioMascota: MascotaService, private miUsuario: UsuarioService, private usuario: Usuario, private miTurno: Turno, private ServicioTurno: TurnoService) {
    this.id_usuario = { id_usuario: this.miUsuario.getIdUsuario() };
  }
  date1: Date;
  es: any;
  invalidDates: Array<Date>;
  confirmarTurno: boolean = false;
  nombreUsuario: string = this.miUsuario.getNombreUsuario();
  apellidoUsuario: string = this.miUsuario.getApellidoUsuario();
  idUsuario: number = this.miUsuario.getIdUsuario();
  desc: string;
  cantChar: number = 200;

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }


    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;


    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }

  mascotaElegida(mascotaElegida) {
    console.log("CAPTURO POR OUTPUT");
    this.confirmarTurno = true;
    this.miVehiculo = mascotaElegida;
  }

  canCaracteres() {
    this.cantChar = 200 - this.desc.length;
    if (this.cantChar < 0) {
      this.cantChar = 0;
    }
  }

  altaTurno() {
    let dia: Date = new Date();
    console.log(dia);
    console.log(this.date1);
    if (this.date1 < dia) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Por favor seleccionar una fecha válida'
      })
    } else {
      if (this.desc == null) {
        this.miTurno.descripcion = " ";
      } else {
        this.miTurno.descripcion = this.desc;
      }
      this.miTurno.estado = 1;
      this.miTurno.fecha = this.date1;
      this.miTurno.id_mascota = this.miVehiculo.id;
      this.ServicioTurno.agregarTurno(this.miTurno)
        .then(data => {
          console.log(data);
          if (data == "ok") {
            swal({
              type: 'success',
              title: '=)',
              text: 'Turno creado exitosamente'
            })
            this.miRouter.navigate(['/cliente/turnos']);
          } else {
            swal({
              type: 'error',
              title: '>(',
              text: 'Error al crear el turno'
            })
          }
        });
    }

  }

  cancelarTurno() {
    this.date1 = null
  }


}
