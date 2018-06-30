import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../clases/usuario';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota/mascota.service';
import { SelectItem } from 'primeng/api';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  cuerpoTabla: any;
  cols: any[];
  opciones: any[];
  tipoU: any[];
  usuario: Usuario;
  nombre: string;
  apellido;
  mail;
  tipo;

  usuarioAux: Usuario;
  displayDialog: boolean = false;

  constructor(private servicioUsuario: UsuarioService, private miMascota: Mascota, private miMascotaService: MascotaService) {
    this.opciones = [
      { label: 'Tipo', value: null },
      { label: 'Admin', value: '10' },
      { label: 'Usuario', value: '20' }
    ];
    this.tipoU = [
      { label: 'Admin', value: 10 },
      { label: 'Usuario', value: 20 }
    ];
  }

  ngOnInit() {
    this.servicioUsuario.traerTodosLosUsuarios()
      .then(data => {
        this.cuerpoTabla = data;
        this.cols = [
          { field: 'nombre', header: 'Nombre' },
          { field: 'apellido', header: 'Apellido' },
          { field: 'mail', header: 'Mail' },
          { field: 'tipo', header: 'Tipo' }
        ];
        console.log(data);
      })
  }

  onRowSelect(user) {
    this.nombre = this.usuarioAux.nombre;
    this.apellido = this.usuarioAux.apellido;
    this.mail = this.usuarioAux.mail;
    this.tipo = this.usuarioAux.tipo;

    this.displayDialog = true;
  }

  guardar() {
    this.displayDialog = false;
    this.servicioUsuario.modificarUsuario(this.usuarioAux)
      .then(data => {
        if (data == 'ok'){
          swal({
            type: 'success',
            title: 'ok!',
            text: 'Modificacion realizada',
          })
        }else{
          swal({
            type: 'error',
            title: 'Ooopss...',
            text: 'Error en la modificacion',
          })
        }
      })
  }
  cancelar() {
    this.usuarioAux.apellido = this.apellido;
    this.usuarioAux.nombre = this.nombre;
    this.usuarioAux.mail = this.mail;
    this.usuarioAux.tipo = this.tipo;
    this.displayDialog = false;
  }

}
