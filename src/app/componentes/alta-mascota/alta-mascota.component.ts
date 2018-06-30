import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota/mascota.service';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-alta-mascota',
  templateUrl: './alta-mascota.component.html',
  styleUrls: ['./alta-mascota.component.css']
})
export class AltaMascotaComponent implements OnInit {
  mascotas: SelectItem[];
  cuerpoTabla: any;
  cols: any[];
  tituloTabla = "MIS MASCOTAS";

  userform: FormGroup
  constructor(private fb: FormBuilder, private miMascota: Mascota, private miHttp: MiHttpService, private miRouter: Router, private miServicioMascota: MascotaService, private miUsuario: UsuarioService) {
    this.mascotas = [
      { label: 'Tipo', value: null },
      { label: 'Perro', value: 1000 },
      { label: 'Gato', value: 2000 }
    ];
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'raza': new FormControl('', Validators.required),
      'color': new FormControl('', Validators.required),
      'edad': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required),
    });
    let datos= {id_usuario: this.miUsuario.getIdUsuario()};
    this.miServicioMascota.traerMascotasPorDuenio(datos).then(data => {
      if (data != null) {
        this.cuerpoTabla = data;
        this.cols = [
          { field: 'raza', header: 'Raza' },
          { field: 'color', header: 'Color' },
          { field: 'edad', header: 'Edad' },
          { field: 'tipo', header: 'Tipo' }
        ]
      }

    });
  }
  onSubmit(value: string) {

    console.log(this.miUsuario.getApellidoUsuario());

    this.miMascota.color = this.userform.value.color;
    this.miMascota.raza = this.userform.value.raza;
    this.miMascota.edad = this.userform.value.edad;
    this.miMascota.tipo = this.userform.value.tipo;
    this.miMascota.id_usuario = this.miUsuario.getIdUsuario();
    this.miServicioMascota.agregarMascota(this.miMascota)
      .then(data => {
        if (data == "ok") {
          swal({
            type: 'success',
            title: 'OK',
            text: 'Mascota agregada correctamente.'
          })
          this.userform.reset();
          this.miRouter.navigate(['/cliente/mascotas']);
        } else {
          swal({
            type: 'error',
            title: 'Error',
            text: 'Error al dar de alta la mascota.'
          })
        }
      });

  }

}
